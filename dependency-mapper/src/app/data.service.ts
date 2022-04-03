import { Injectable } from '@angular/core';
import { Guid } from "guid-typescript";
import { Subject } from 'rxjs';


class Ticket {
  id: string;
  url: string;
  title: string;
  description: string;
  tagId: string;
  groupId: string;
}

class Dependency {
  parentId: string;
  childId: string;
}

class Tag {
  id: string;
  value: string;

  bgColor: string;
  borderColor: string;
  borderWidth: number;
  borderStyle: string;
  textColor: string;

  constructor(value: string = '') {
    this.value = value;
  }
}

class Group {
  id: string;
  value: string;
  tagId: string;
  groupId: string; // not yet used
}


@Injectable({
  providedIn: 'root'
})
class DataService {
  ticketLookup: any;
  groupLookup: any;
  dependencyLookup: Array<Dependency>;
  tagLookup: any;
  title: string;
  mapId: string;

  // async observables
  genericObserver: Subject<void>; // for re-rendering and no data grabbing
  titleObserver: Subject<void>;
  ticketObserver: Subject<void>;
  groupObserver: Subject<void>;
  dependencyObserver: Subject<void>;
  tagObserver: Subject<void>;
  newMapObserver: Subject<void>;

  constructor() {
    this.ticketLookup = {};
    this.groupLookup = {};
    this.dependencyLookup = new Array<Dependency>();
    this.tagLookup = {};

    this.genericObserver = new Subject<void>();
    this.titleObserver = new Subject<void>();
    this.ticketObserver = new Subject<void>();
    this.groupObserver = new Subject<void>();
    this.dependencyObserver = new Subject<void>();
    this.tagObserver = new Subject<void>();
    this.newMapObserver = new Subject<void>();
  }

  /* Tickets */

  public addTicket(ticket: Ticket): Ticket {
    // set variables
    ticket.id = ticket.id || Guid.raw();
    ticket.url = ticket.url || '';
    ticket.title = ticket.title || '';
    ticket.description = ticket.description || '';
    ticket.tagId = ticket.tagId || '';
    ticket.groupId = ticket.groupId || '';

    this.ticketLookup[ticket.id] = ticket;

    this.ticketObserver.next();
    return ticket;
  }

  public removeTicket(id: string): void {
    this.removeRelatedDependencies(id);
    delete this.ticketLookup[id];
    this.ticketObserver.next();
  }

  public getTicket(id: string): Ticket {
    return this.ticketLookup[id];
  }

  get tickets(): Array<Ticket> {
    return Object.values(this.ticketLookup);
  }

  /* Groups */

  addGroup(group: Group): Group {
    group.id = group.id || Guid.raw();

    // validate data
    group.value = group.value || '';
    group.tagId = group.tagId || '';
    group.groupId = group.groupId || '';

    this.groupLookup[group.id] = group;
    this.groupObserver.next();

    return group;
  }

  removeGroup(id: string) {
    this.removeGroupReferences(id);
    delete this.groupLookup[id];
    this.groupObserver.next();
  }

  removeGroupReferences(id: string) {
    this.tickets.forEach(ticket => {
      if (ticket.groupId === id) {
        ticket.groupId = '';
      }
    });
    this.ticketObserver.next();
  }

  getGroup(id: string): Group {
    return this.groupLookup[id];
  }

  getGroupTickets(id: string): Array<Ticket> {
    return this.tickets.filter(ticket => ticket.groupId === id);
  }

  get groups(): Array<Group> {
    return Object.values(this.groupLookup);
  }

  /* Dependencies */

  addDependency(parentId: string, childId: string): void {
    if (parentId === childId) {
      return;
    }

    let dep = new Dependency();
    dep.parentId = parentId;
    dep.childId = childId;

    this.dependencyLookup.push(dep);
    this.dependencyObserver.next();
  }

  removeDependency(parentId: string, childId: string): void {
    this.dependencyLookup = this.dependencyLookup.filter((dep) => dep.parentId != parentId || dep.childId != childId);
    this.dependencyObserver.next();
  }

  removeRelatedDependencies(id: string): void {
    this.dependencyLookup = this.dependencyLookup.filter((dep) => dep.parentId !== id && dep.childId !== id);
    this.dependencyObserver.next();
  }

  getRelatedDependencies(id: string): Array<Dependency> {
    return this.dependencyLookup.filter((dep) => dep.parentId === id || dep.childId == id);
  }

  getParentDependencies(id: string): Array<Dependency> {
    return this.dependencyLookup.filter((dep) => dep.childId === id);
  }

  getChildDependencies(id: string): Array<Dependency> {
    return this.dependencyLookup.filter((dep) => dep.parentId === id);
  }

  dependencyExists(parentId: string, childId: string): boolean {
    return !!this.dependencyLookup.find((link) => link.parentId == parentId && link.childId == childId);
  }

  get dependencies(): Array<Dependency> {
    return this.dependencyLookup;
  }

  /* Title */

  setTitle(title: string): void {
    this.title = title;
    this.titleObserver.next();
  }

  /* Tags */

  addTag(tag: Tag): Tag {
    if (!tag.id) {
      tag.id = Guid.raw();
    }

    // validate fields
    tag.bgColor = tag.bgColor || '';
    tag.borderColor = tag.borderColor || '';
    tag.textColor = tag.textColor || '';
    tag.borderStyle = tag.borderStyle || '';
    // tag.borderWidth = tag.borderWidth || '';

    this.tagLookup[tag.id] = tag;
    this.tagObserver.next();
    return tag;
  }

  removeTag(id: string): void {
    this.removeTagReferences(id);
    delete this.tagLookup[id];
    this.tagObserver.next();
  }

  removeTagReferences(id: string) {
    this.tickets.forEach(ticket => {
      if (ticket.tagId === id) {
        ticket.tagId = '';
      }
    });

    this.groups.forEach(group => {
      if (group.tagId === id) {
        group.tagId = '';
      }
    });
  }

  getTag(id: string): Tag {
    return this.tagLookup[id];
  }

  get tags(): Array<Tag> {
    return Object.values(this.tagLookup);
  }

  /* generation utilities */

  generateNewMap(title: string): void {
    this.title = title;
    this.newMapObserver.next();
  }
}

export { DataService, Ticket, Dependency, Tag, Group };
