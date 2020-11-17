import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { Guid } from "guid-typescript";
import * as pako from 'pako';


class Ticket {
  id: string;
  jiraId: string;
  title: string;
  description: string;
}

class Dependency {
  parentId: string;
  childId: string;
}


@Injectable({
  providedIn: 'root'
})
class DataService {
  ticketLookup: Map<string, Ticket>;
  links: Array<Dependency>;

  constructor(
    private configService: ConfigService
  ) {
    console.log('Initializing Data Service');

    this.ticketLookup = new Map<string, any>();
    this.links = new Array<Dependency>();
  }

  /* TICKET LAND */


  addTicket(ticket: Ticket): Ticket {
    // if no id, make one (Jira might have their own ids)
    if (!ticket.id) {
      ticket.id = Guid.raw();
    }
    // empty out any undefines
    ticket.jiraId = ticket.jiraId ? ticket.jiraId : '';
    ticket.title = ticket.title ? ticket.title : '';
    ticket.description = ticket.description
      ? this.formatToData(ticket.description)
      : '';

    console.log('addTicket', ticket);
    this.ticketLookup.set(ticket.id, ticket);
    return ticket;
  }

  formatToData(text: string): string {
    return text.replace('\n', '<br>');
  }

  formatFromData(text: string): string {
    return text.replace('<br>', '\n');
  }

  removeTicket(id: string): void {
    let ticket: Ticket = this.getTicket(id);
    this.removeRelatedDependencies(id);
    this.ticketLookup.delete(id);
    console.log(this.links);
  }

  getTicketByTitle(title: string): Ticket {
    return this.tickets.find((ticket) => ticket.title == title);
  }

  getTicket(id: string): Ticket {
    return this.ticketLookup.get(id);
  }

  get tickets(): Array<Ticket> {
    let arr = Array<Ticket>();
    this.ticketLookup.forEach((value, key) => arr.push(value));
    return arr;
  }


  /* DEPENDENCY LAND */

  addDependency(parentId: string, childId: string): void {
    console.log('adding dependency', parentId, childId);
    let dep = new Dependency();

    dep.parentId = parentId;
    dep.childId = childId;
    this.links.push(dep);
  }

  removeDependency(parentId: string, childId: string): void {
    this.links = this.links.filter((dep) => dep.parentId != parentId || dep.childId != childId);
  }

  removeRelatedDependencies(id: string): void {
    this.links = this.links.filter((dep) => dep.parentId !== id && dep.childId !== id);
  }

  removeChildDependencies(id: string): void {
    this.links = this.links.filter((dep) => dep.parentId !== id);
  }

  removeParentDependencies(id: string): void {
    this.links = this.links.filter((dep) => dep.childId !== id);
  }

  getRelatedDependencies(id: string): Array<Dependency> {
    return this.links.filter((dep) => dep.parentId === id || dep.childId == id);
  }

  getParentDependencies(id: string): Array<Dependency> {
    return this.links.filter((dep) => dep.childId === id);
  }

  getChildDependencies(id: string): Array<Dependency> {
    return this.links.filter((dep) => dep.parentId === id);
  }

  resetParentDependencies(id: string, newDeps: Array<string>): void {
    this.removeParentDependencies(id);
    newDeps.forEach((dep) => this.addDependency(dep, id));
  }

  resetChildDependencies(id: string, newDeps: Array<string>): void {
    this.removeChildDependencies(id);
    newDeps.forEach((dep) => this.addDependency(id, dep));
  }

  dependencyExists(parentId: string, childId: string): boolean {
    return !!this.links.find((link) => link.parentId == parentId && link.childId == childId);
  }


  /* OTHER THINGS LAND */


  generateUrl(jiraId: string): string {
    return `${this.configService.getCookie('jira-base-url')}/${this.configService.getCookie('jira-project')}-${jiraId}`
  }

  export(): any {
    let exportObj = {};

    exportObj['tickets'] = this.tickets;
    exportObj['dependencies'] = this.links;

    return exportObj;
  }

  exportURL(): string { // change name later
    let exportedData = this.export();
    const compressedData = pako.gzip(JSON.stringify(exportedData), { to: 'string' });
    return encodeURIComponent(btoa(compressedData));
  }

  importURL(encodedData: string): void {
    const compressedData = atob(encodedData);
    const data = JSON.parse(pako.ungzip(compressedData, { to: 'string' }));

    if (data.tickets) {
      data.tickets.forEach((ticket: Ticket) => {
        this.addTicket(ticket);
      });
    }

    if (data.dependencies) {
      data.dependencies.forEach((dep: Dependency) => {
        this.addDependency(dep.parentId, dep.childId);
      });
    }
  }

}

export {DataService, Ticket, Dependency};