import { noop } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { DataService, Ticket, Tag, Group } from '../data.service';
import { State, TreeEditService } from './tree-edit/tree-edit.service';

/* IDEAS
  - Store the different parts of the tree and react to different items changing, like dependencies and tickets
    This way, I won't need to re-generate ALL the syntax, just the parts that changed.
*/

@Injectable({
  providedIn: 'root'
})
class TreeService {
  defaultTag: Tag;
  defaultSelectingTag: Tag;
  defaultGroupTag: Tag;
  editingTicketTag: Tag;
  selectedTag: Tag;
  unselectedTag: Tag;
  classPrefix = 'class_'; // this is needed because the class needs to start with letters

  subgraphContents: any;

  constructor(
    private dataService: DataService,
    private treeEditService: TreeEditService) {
    window['treeService'] = this;

    // TODO: expose the default so it can be changed
    //   Problem: The fields component has the name field that cannot be changed for this.
    this.defaultTag = new Tag('');
    this.defaultTag.bgColor = '#ffffff';
    this.defaultTag.borderColor = '#a0a0a0';

    this.defaultSelectingTag = new Tag('');
    this.defaultSelectingTag.bgColor = '#e6e6e6';
    this.defaultSelectingTag.borderColor = '#a0a0a0';

    this.defaultGroupTag = new Tag('');
    this.defaultGroupTag.id = 'GROUP_TAG'
    this.defaultGroupTag.bgColor = '#d9d9d9';
    this.defaultGroupTag.borderColor = '#909090';

    this.editingTicketTag = new Tag('');
    this.editingTicketTag.id = 'EDITING_TAG'
    this.editingTicketTag.bgColor = '#d9f0ff';
    this.editingTicketTag.borderColor = '#008aa6';

    this.selectedTag = new Tag('');
    this.selectedTag.id = 'SELECTED_TAG'
    this.selectedTag.bgColor = '#5fff7d';
    this.selectedTag.borderColor = '#009809';

    this.unselectedTag = new Tag('');
    this.unselectedTag.id = 'UNSELECTED_TAG';
    this.unselectedTag.bgColor = '#ff6161'
    this.unselectedTag.borderColor = '#a60000'
  }

  generateSyntax(): string {
    // reset state
    this.subgraphContents = {};

    let syntax = 'flowchart TD\n';

    // classes
    syntax += this.generateClasses() + '\n';
    syntax += this.generateNodes() + '\n';
    syntax += this.generateDependencies() + '\n';
    syntax += this.generateSubgraphs();

    return syntax;
  }

  generateClasses(): string {
    const currentState = this.treeEditService.state;
    let classes = '';

    if (currentState == State.EditNode || currentState == State.EditGroup) {
      classes += this.generateClassSyntax(this.defaultSelectingTag) + '\n';
    } else {
      classes += this.generateClassSyntax(this.defaultTag) + '\n';
    }

    classes += this.generateClassSyntax(this.defaultGroupTag) + '\n';
    classes += this.generateClassSyntax(this.editingTicketTag) + '\n';
    classes += this.generateClassSyntax(this.selectedTag) + '\n';
    classes += this.generateClassSyntax(this.unselectedTag) + '\n';

    this.dataService.tags.forEach(tag => classes += this.generateClassSyntax(tag) + '\n');

    return classes;
  }

  generateClassSyntax(tag: Tag): string {
    let classSyntax = 'classDef';

    classSyntax += tag.id ? ` ${this.classPrefix}${tag.id}` : ' node';
    classSyntax += ` fill:${tag.bgColor}`;
    classSyntax += `,stroke:${tag.borderColor}`;
    classSyntax += `,stroke-width:${tag.borderWidth}`;
    classSyntax += tag.borderStyle === 'dashed' ? ',stroke-dasharray:5 4' : '';
    classSyntax += `,color:${tag.textColor}`;

    return classSyntax;
  }

  generateNodes(): string {
    let nodes = '';

    this.dataService.tickets.forEach(ticket => {
      this.addToSubgraph(ticket);
      nodes += this.generateNodeSyntax(ticket) + '\n'
      nodes += `click ${ticket.id} treeClick\n`;
    });

    // nodes += 'athing(<h3 id=header class=yes-no>WOW EVEN ANOTHER TICKET</h3><div id=description>This one is designed to stretch a good <br/>bit.<br/>The page must be longer and longer and <br/>longer and longer</div>):::thing\n';
    // nodes += `click athing treeClick\n`;
    
    // nodes += 'anotherthing(<h3 id=header>Link text</h3><div id=description>A Definite Description</div>):::thing\n';
    // nodes += `click anotherthing treeClick\n`;
    return nodes;
  }

  generateNodeSyntax(ticket: Ticket): string {
    /* FORMAT:
      id("<b>title</b><hr>description"):::className
    */

    const title = this.formatText(ticket.title);
    const icon = this.shouldShowLinkIcon(ticket) ? '*' : '';
    const description = ticket.description ? '<div class=desc><div></div>' + this.formatText(ticket.description) + '</div>' : '';
    let style = this.generateNodeStyleSyntax(ticket);

    return `${ticket.id}("<div class=title><b>${title}${icon}</b></div>${description}")${style}`;
  }

  generateNodeStyleSyntax(ticket: Ticket): string {
    switch(this.treeEditService.state) {
      case State.EditNode:
      case State.EditGroup:
        if (this.treeEditService.stagedRemovedSelections.includes(ticket.id)) {
          return `:::${this.classPrefix}${this.unselectedTag.id}`
        } else if (this.treeEditService.stagedAddedSelections.includes(ticket.id)) {
          return `:::${this.classPrefix}${this.selectedTag.id}`
        } else if (this.treeEditService.preAddedSelections.includes(ticket.id)) {
          return `:::${this.classPrefix}${this.selectedTag.id}`
        } else if (this.treeEditService.currentNodeId === ticket.id) {
          return `:::${this.classPrefix}${this.editingTicketTag.id}`
        }
        return '';
      default:
        return ticket.tagId ? ':::' + this.classPrefix + ticket.tagId : '';
    }
  }

  generateDependencies(): string {
    let depenencies = '';

    this.dataService.dependencies.forEach(dependency => {
      depenencies += `${dependency.parentId} --> ${dependency.childId}\n`;
    });

    return depenencies;
  }

  addToSubgraph(ticket: Ticket) {
    if (!ticket.groupId) {
      return;
    }

    if (!this.subgraphContents[ticket.groupId]) {
      this.subgraphContents[ticket.groupId] = [];
    }
    this.subgraphContents[ticket.groupId].push(ticket.id);
  }

  generateSubgraphs(): string {
    let subgraphs = '';


    Object.keys(this.subgraphContents).forEach(groupId => {
      const group = this.dataService.getGroup(groupId);
      if (group) {
        subgraphs += this.generateSubgraphSyntax(group);
      }
    });
    return subgraphs;
  }

  generateSubgraphSyntax(group: Group) {
    let subgraphSyntax = 'subgraph';

    subgraphSyntax += ` ${group.id}[<b>${group.value}</b>]\n`;
    this.subgraphContents[group.id].forEach(ticketId => subgraphSyntax += ticketId + '\n');
    subgraphSyntax += 'end\n';

    // add the class
    subgraphSyntax += group.tagId
      ? `${group.id}:::${this.classPrefix}${group.tagId}`
      : `${group.id}:::${this.classPrefix}${this.defaultGroupTag.id}`
    subgraphSyntax += '\n';

    return subgraphSyntax;
  }

  shouldShowLinkIcon(ticket: Ticket): boolean {
    return !!ticket.url;
  }

  formatText(text: string): string {
    // sanitize characters
    text = text.replace(/\n/g, '<br/>');
    text = text.replace(/\"/g, '#quot;');

    const numChars = 50;

    if (text.length < numChars) {
      return text; // replace with sanitized text
    }

    // I'm 99% sure there's a better way to do this, but here we are right now...
    let line = '';
    let output = '';
    const words = text.split(' ');
    words.forEach(word => {
      if ((line + ' ' + word).length > numChars) {
        output += line + '<br/>';
        line = '';
      }
      line += word + ' ';
    });
    output += line;

    return output;
  }
}

export { TreeService };
