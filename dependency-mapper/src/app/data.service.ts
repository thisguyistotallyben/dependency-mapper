import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { Guid } from "guid-typescript";


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
  baseUrl = '';
  defaultProject = '';
  ticketLookup: Map<string, Ticket>;
  links: Array<Dependency>;

  constructor(private configService: ConfigService) {
    console.log('Initializing Data Service');
    this.baseUrl = this.configService.getRawConfig()['base-url'];
    this.defaultProject = this.configService.getRawConfig()['default-project'];
    this.ticketLookup = new Map<string, any>();
    this.links = new Array<Dependency>();

    console.log('base url: ', this.baseUrl);
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
    ticket.description = ticket.description ? ticket.description : '';

    console.log('addTicket', ticket);
    this.ticketLookup.set(ticket.id, ticket);
    return ticket;
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


  /* OTHER UTILITIES LAND */


  generateUrl(id: string) {
    let ticket = this.ticketLookup.get(id);

    if (!ticket || !ticket.jiraId) {
      return '';
    }
    return `${this.baseUrl}${this.defaultProject}-${ticket.jiraId}`;
  }

}

export {DataService, Ticket, Dependency};
