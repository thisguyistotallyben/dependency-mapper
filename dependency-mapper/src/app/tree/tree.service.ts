import { Injectable } from '@angular/core';
import { DataService, Ticket, Tag } from '../data.service';


class TagStyle {
  tagId: string;
  bgColor: string;
  borderColor: string;
  borderWidth: number;
  borderStyle: string;
}


@Injectable({
  providedIn: 'root'
})
class TreeService {
  component; // this is the unethical way to do this. I should probably do a pub-sub thing
  tagStyles: Map<string, TagStyle>;
  /*
    INFO FOR ME (ds) => data service

    tagStyles is a map of (ds)tag to the corresponding tag style
  */

  constructor(private dataService: DataService) {
    this.tagStyles = new Map<string, TagStyle>();
  }

  generateSyntax(): string {
    let outputString = '';
    const tickets = new Array<string>();
    const links = new Array<string>();

    // generate formatted tickets
    this.dataService.tickets.forEach((value, key) => {
      tickets.push(this.formatTicket(value));
    });

    // generate formatted dependencies
    this.dataService.getDependencies().forEach((dep) => {
      if (dep.parentId && dep.childId) {
        links.push(`${dep.parentId} --> ${dep.childId}`);
      }
    });

    outputString = 'graph TD\n';
    tickets.forEach((val) => outputString += val + '\n');
    outputString += '\n';
    links.forEach((val) => outputString += val + '\n');

    // console.log('Current Tree Syntax:');
    // console.log(outputString);
    return outputString;
  }

  formatTicket(ticket: Ticket): string {
    // format: id[<b>id - title</b><br/><br/>description]
    const title = `${ticket.id}[<b>${ticket.title}</b><hr>`;
    const description = `${ticket.description}]`;
    // TODO: Check for more things, eg. url even exists and whatnot
    const link = ticket.jiraId
      ? `\nclick ${ticket.id} "${this.dataService.generateUrl(ticket.jiraId)}" _blank`
      : '';

    return title + description + link;
  }

  linkComponent(component: any): void {
    this.component = component;
  }

  renderTree(): void {
    this.component.renderTree();
  }

  export(): any {
    const tagStyles = Array.from(this.tagStyles.values());
    console.log('exporting tag styles', tagStyles);
    return {tagStyles};
  }


  /* TAG STYLES LAND */


  loadTagStyles(data: any): void {
    if (data.tagStyles) {
      console.log('yeet');
      data.tagStyles.forEach((ts: TagStyle) => this.tagStyles.set(ts.tagId, ts));
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
