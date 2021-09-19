import { JiraService } from './../jira/jira.service';
import { Injectable } from '@angular/core';
import { DataService, Ticket, Tag } from '../data.service';


class TagStyle {
  tagId: string;
  bgColor: string;
  borderColor: string;
  borderWidth: number;
  borderStyle: string;
  textColor: string;
}


@Injectable({
  providedIn: 'root'
})
class TreeService {
  component; // this is the unethical way to do this. I should probably do a pub-sub thing
  tagStyles: Map<string, TagStyle>;
  defaultTagStyle: TagStyle;
  classPrefix = 'class_'; // this is needed because the class needs to start with letters
  /*
    INFO FOR ME (ds) => data service

    tagStyles is a map of (ds)tag to the corresponding tag style

  */

  constructor(
    private dataService: DataService,
    private jiraService: JiraService) {
    window['treeService'] = this;
    this.tagStyles = new Map<string, TagStyle>();

    // TODO: expose the default so it can be changed
    //   Problem: The fields component has the name field that cannot be changed for this.
    this.defaultTagStyle = new TagStyle();
    this.defaultTagStyle.bgColor = '#eae8e8';
    this.defaultTagStyle.borderColor = '#000000';
  }

  generateSyntax(): string {
    let outputString = '';
    const styleClasses = new Array<string>();
    const tickets = new Array<string>();
    const links = new Array<string>();

    // generate formatted style classes
    styleClasses.push(this.formatClass(this.defaultTagStyle));
    Array.from(this.tagStyles.values()).forEach((ts: TagStyle) => {
      styleClasses.push(this.formatClass(ts));
    });

    // generate formatted tickets
    this.dataService.tickets.forEach((value, key) => {
      tickets.push(this.formatTicket(value));
    });

    // generate formatted dependencies
    this.dataService.dependencies.forEach((dep) => {
      if (dep.parentId && dep.childId) {
        links.push(`${dep.parentId} --> ${dep.childId}`);
      }
    });

    outputString = 'graph TD\n';
    styleClasses.forEach((val) => outputString += val + '\n');
    outputString += '\n';
    tickets.forEach((val) => outputString += val + '\n');
    outputString += '\n';
    links.forEach((val) => outputString += val + '\n');

    // console.log(outputString);
    return outputString;
  }

  formatClass(ts: TagStyle): string {
    let output = '';

    output += ts.tagId
      ? 'classDef ' + this.classPrefix + ts.tagId
      : 'classDef node';
    output += ' fill:' + ts.bgColor;
    output += ',stroke:' + ts.borderColor;
    output += ',stroke-width:' + ts.borderWidth;
    output += ts.borderStyle === 'dashed'
      ? ',stroke-dasharray:5 4'
      : '';
    output += ',color:' + ts.textColor;

    return output;
  }

  formatTicket(ticket: Ticket): string {
    /* FORMAT:
      id[<b>id - title</b><br/><br/>description]:::className
    */
    const title = `${ticket.id}[\"<b>${this.formatText(ticket.title)} ${this.shouldShowJiraIcon(ticket) ? 'fab:fa-jira' : ''}</b>`;
    this.formatText(ticket.description);
    const description = ticket.description !== '' ?
      `<hr>${this.formatText(ticket.description)}\"]`
      : '\"]';
    // TODO: Check for more things, eg. url even exists and whatnot
    const styleClass = ticket.tagId
      ? ':::' + this.classPrefix + ticket.tagId
      : '';
    const link = `\nclick ${ticket.id} treeClick`;
    // const link = ticket.jiraId
    //   ? `\nclick ${ticket.id} "${this.dataService.generateUrl(ticket.jiraId)}" _blank`
    //   : '';

    return title + description + styleClass + link;
  }

  shouldShowJiraIcon(ticket: Ticket) {
    return this.jiraService.isEnabled && ticket.jiraId;
  }

  formatText(text: string): string {
    // sanitize characters
    text = text.replace(/\n/g, '<br>');
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
        output += line + '<br>';
        line = '';
      }
      line += word + ' ';
    });
    output += line;

    return output;
  }

  linkComponent(component: any): void {
    this.component = component;
  }

  renderTree(): void {
    this.component.renderTree();
  }

  export(): any {
    const tagStyles = Array.from(this.tagStyles.values());
    return {
      tagStyles,
      defaultTagStyle: this.defaultTagStyle
    };
  }


  /* TAG STYLES LAND */


  loadTagStyles(data: any): void {
    if (data.tagStyles.length) {
      data.tagStyles.forEach((ts: TagStyle) => this.tagStyles.set(ts.tagId, ts));
    }

    if (data.defaultTagStyle) {
      this.defaultTagStyle = data.defaultTagStyle;
    }
  }

  addTagStyle(tagStyle: TagStyle): void {
    this.tagStyles.set(tagStyle.tagId, tagStyle);
  }

  getTagStyles(): Array<TagStyle> {
    let arr = Array<TagStyle>();
    this.tagStyles.forEach((value, key) => arr.push(value));
    return arr;
  }
}

export { TreeService, TagStyle };
