import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { Guid } from "guid-typescript";


class Ticket {
  id: string;
  jiraId: string;
  title: string;
  description: string;
  tagId: string;
}

class Dependency {
  parentId: string;
  childId: string;
}

class Tag {
  id: string;
  value: string;
}


@Injectable({
  providedIn: 'root'
})
class DataService {
  ticketLookup: Map<string, Ticket>;
  dependencyLookup: Array<Dependency>;
  tagLookup: Map<string, Tag>;
  title: string;

  constructor(
    private configService: ConfigService
  ) {
    this.ticketLookup = new Map<string, any>();
    this.dependencyLookup = new Array<Dependency>();
    this.tagLookup = new Map<string, Tag>();
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
      ? ticket.description
      : '';

    this.ticketLookup.set(ticket.id, ticket);
    return ticket;
  }

  removeTicket(id: string): void {
    let ticket: Ticket = this.getTicket(id);
    this.removeRelatedDependencies(id);
    this.ticketLookup.delete(id);
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
    if (parentId === childId) {
      return;
    }

    let dep = new Dependency();

    dep.parentId = parentId;
    dep.childId = childId;
    this.dependencyLookup.push(dep);
  }

  getDependencies(): Array<Dependency> {
    return this.dependencyLookup;
  }

  removeDependency(parentId: string, childId: string): void {
    this.dependencyLookup = this.dependencyLookup.filter((dep) => dep.parentId != parentId || dep.childId != childId);
  }

  removeRelatedDependencies(id: string): void {
    this.dependencyLookup = this.dependencyLookup.filter((dep) => dep.parentId !== id && dep.childId !== id);
  }

  removeChildDependencies(id: string): void {
    this.dependencyLookup = this.dependencyLookup.filter((dep) => dep.parentId !== id);
  }

  removeParentDependencies(id: string): void {
    this.dependencyLookup = this.dependencyLookup.filter((dep) => dep.childId !== id);
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

  resetParentDependencies(id: string, newDeps: Array<string>): void {
    this.removeParentDependencies(id);
    newDeps.forEach((dep) => this.addDependency(dep, id));
  }

  resetChildDependencies(id: string, newDeps: Array<string>): void {
    this.removeChildDependencies(id);
    newDeps.forEach((dep) => this.addDependency(id, dep));
  }

  dependencyExists(parentId: string, childId: string): boolean {
    return !!this.dependencyLookup.find((link) => link.parentId == parentId && link.childId == childId);
  }


  /* TITLE LAND */


  setTitle(title: string): void {
    this.title = title;
  }

  getTitle(): string {
    return this.title;
  }


  /* TAG LAND */


  addTag(value: string): Tag {
    const tag = new Tag();
    tag.id = Guid.raw();
    tag.value = value;

    this.tagLookup.set(tag.id, tag);
    return tag;
  }

  insertOrUpdateTag(tag: Tag): Tag {
    this.tagLookup.set(tag.id, tag);
    return tag;
  }

  get tags(): Array<Tag> {
    return Array.from(this.tagLookup.values());
  }

  getTag(id: string): Tag {
    return this.tagLookup.get(id);
  }


  /* OTHER THINGS LAND */


  generateUrl(jiraId: string): string {
    return `${this.configService.getCookie('jira-base-url')}/browse/${this.configService.getCookie('jira-project')}-${jiraId}`
  }

  export(): any {
    return {
      jiraBaseUrl: this.configService.getCookie('jira-base-url'),
      jiraProject: this.configService.getCookie('jira-project'),
      title: this.title,
      tickets: this.tickets,
      dependencies: this.dependencyLookup,
      tags: this.tags
    };
  }

  import(data: any): void {
    if (data.jiraBaseUrl) {
      this.configService.setCookie('jira-base-url', data.jiraBaseUrl);
    }

    if (data.jiraProject) {
      this.configService.setCookie('jira-project', data.jiraProject);
    }

    if(data.title) {
      this.setTitle(data.title);
    }

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

    if (data.tags) {
      data.tags.forEach((tag: Tag) => this.tagLookup.set(tag.id, tag));
    }
  }

}

export { DataService, Ticket, Dependency, Tag };
