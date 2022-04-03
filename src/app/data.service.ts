import { JiraService } from './jira/jira.service';
import { ConfigService } from './config.service';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Guid } from "guid-typescript";
import { Subject } from 'rxjs';


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

  bgColor: string;
  borderColor: string;
  borderWidth: number;
  borderStyle: string;
  textColor: string;

  constructor(value: string) {
    this.value = value;
  }
}


@Injectable({
  providedIn: 'root'
})
class DataService {
  ticketLookup: any;
  dependencyLookup: Array<Dependency>;
  tagLookup: any;
  title: string;
  mapId: string;
  jiraURL: string;
  jiraProject: string;

  // async observables
  titleObserver: Subject<void>;
  ticketObserver: Subject<void>;
  dependencyObserver: Subject<void>;
  tagObserver: Subject<void>;
  newMapObserver: Subject<void>;

  constructor() {
    console.log('constructor');
    this.ticketLookup = {};
    this.dependencyLookup = new Array<Dependency>();
    this.tagLookup = {};

    this.titleObserver = new Subject<void>();
    this.ticketObserver = new Subject<void>();
    this.dependencyObserver = new Subject<void>();
    this.tagObserver = new Subject<void>();
    this.newMapObserver = new Subject<void>();
  }

  /* Tickets */

  public addTicket(ticket: Ticket): Ticket {
    if (!ticket.id) {
      ticket.id = Guid.raw();
    }

    // empty out any undefines
    ticket.jiraId = ticket.jiraId ? ticket.jiraId : '';
    ticket.title = ticket.title ? ticket.title : '';
    ticket.description = ticket.description ? ticket.description : '';

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
    console.log('in get ticket for', id, this.ticketLookup);
    return this.ticketLookup[id];
  }

  get tickets(): Array<Ticket> {
    return Object.values(this.ticketLookup);
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

    this.tagLookup[tag.id] = tag;
    this.tagObserver.next();
    return tag;
  }

  removeTag(id: string): void {
    this.tagLookup.delete(id);
    this.tagObserver.next();
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

  generateUrl(jiraId: string): string {
    return `${this.jiraURL}/browse/${this.jiraProject}-${jiraId}`;
  }
}











// @Injectable({
//   providedIn: 'root'
// })
// class DataService {
//   ticketLookup: Map<string, Ticket>;
//   dependencyLookup: Array<Dependency>;
//   tagLookup: Map<string, Tag>;
//   title: string;
//   mapId: string;

//   // async observables
//   titleObserver: Subject<string>;

//   constructor(
//     private configService: ConfigService,
//     private jiraService: JiraService
//   ) {
//     this.ticketLookup = new Map<string, any>();
//     this.dependencyLookup = new Array<Dependency>();
//     this.tagLookup = new Map<string, Tag>();

//     this.titleObserver = new Subject<string>();
//   }








//   /* OTHER THINGS LAND */


//   generateUrl(jiraId: string): string {
//     return `${this.configService.getCookie('jira-base-url')}/browse/${this.configService.getCookie('jira-project')}-${jiraId}`
//   }

//   export(): any {
//     return {
//       jiraEnabled: this.configService.getConfig('jira-enabled'),
//       jiraBaseUrl: this.configService.getCookie('jira-base-url'),
//       jiraProject: this.configService.getCookie('jira-project'),
//       title: this.title,
//       tickets: this.tickets,
//       dependencies: this.dependencyLookup,
//       tags: this.tags
//     };
//   }

//   import(data: any): void {
//     const jiraIsEnabled = data.jiraEnabled
//       ? data.jiraEnabled === 'true'
//       : true; // this looks weird, but it should default to true for backwards compatibility
//     this.jiraService.isEnabled = jiraIsEnabled;

//     if (data.jiraBaseUrl) {
//       this.configService.setCookie('jira-base-url', data.jiraBaseUrl);
//     }

//     if (data.jiraProject) {
//       this.configService.setCookie('jira-project', data.jiraProject);
//     }

//     if(data.title) {
//       this.setTitle(data.title);
//     }

//     if (data.tickets) {
//       data.tickets.forEach((ticket: Ticket) => {
//         this.addTicket(ticket);
//       });
//     }

//     if (data.dependencies) {
//       data.dependencies.forEach((dep: Dependency) => {
//         this.addDependency(dep.parentId, dep.childId);
//       });
//     }

//     if (data.tags) {
//       data.tags.forEach((tag: Tag) => this.tagLookup.set(tag.id, tag));
//     }
//   }

// }

export { DataService, Ticket, Dependency, Tag };
