import { JiraService } from './../jira/jira.service';
import { Injectable } from '@angular/core';
import { DataService, Ticket } from '../data.service';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  component; // this is the unethical way to do this. I should probably do a pub-sub thing

  constructor(private dataService: DataService) { }

  generateSyntax(): string {
    let outputString = '';
    const tickets = new Array<string>();
    const links = new Array<string>();

    // generate formatted tickets
    this.dataService.tickets.forEach((value, key) => {
      tickets.push(this.formatTicket(value));
    });

    // generate formatted dependencies
    this.dataService.links.forEach((dep) => {
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
}
