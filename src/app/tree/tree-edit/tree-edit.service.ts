import { DataService, Ticket } from 'src/app/data.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

enum State {
  View,
  Menu,
  EditNode,
  EditGroup
}

@Injectable({
  providedIn: 'root'
})
class TreeEditService {
  currentNodeId: string; // id of either a ticket or a group
  selections: Set<string>;
  preAddedSelections: Array<string>;
  stagedAddedSelections: Array<string>;
  stagedRemovedSelections: Array<string>;
  posX = 0;
  posY = 0;

  state: State;
  stateObserver: Subject<State>

  constructor(
    private dataService: DataService,
    private http: HttpClient
  ) {
    window['treeEditService'] = this;
    this.stateObserver = new Subject<State>();
    this.state = State.View;
    this.selections = new Set<string>();
    this.stagedAddedSelections = new Array<string>();
    this.stagedRemovedSelections = new Array<string>();

    document.onmousemove = (ev) => {
      window['mouse_x'] = ev.pageX;
      window['mouse_y'] = ev.pageY;
    }
  }

  handleTreeClick(nodeId: string) {

    switch (this.state) {
      case State.View:
        this.currentNodeId = nodeId;
        this.openMenu();
        break;
      case State.EditNode:
      case State.EditGroup:
        this.handleSelection(nodeId);
        break;
      default:
        this.closeMenu();
    }
  }

  handleSelection(nodeId: string) {
    if (nodeId === this.currentNodeId) {
      return;
    }

    if (this.selections.has(nodeId)) {
      this.selections.delete(nodeId);
    } else {
      this.selections.add(nodeId);
    }

    this.stateObserver.next(this.state);
  }

  clearSelections() {
    this.selections.clear();
    this.preAddedSelections = [];
    this.stagedAddedSelections = [];
    this.stagedRemovedSelections = [];
  }

  openMenu() {
    // this.currentTicket = this.dataService.getTicket(nodeId);
    // this.currentNodeId = nodeId;
    this.posX = window['mouse_x'];
    this.posY = window['mouse_y'];
    this.state = State.Menu;
    this.stateObserver.next(this.state);
  }

  closeMenu() {
    this.state = State.View;
    this.stateObserver.next(this.state);
  }

  getUrlOrigin(url: string): string {
    return new URL(this.formatUrl(url)).origin;
  }

  getURLHostname(url: string): string {
    return new URL(this.formatUrl(url)).hostname;
  }

  formatUrl(url): string {
    return url.includes('//')
      ? url
      : 'https://' + url;
  }

  get menuIsOpen() {
    return this.state === State.Menu;
  }

  get dependenciesAreBeingSet() {
    // return this.state === 'parents' || this.state === 'children';
    return false;
  }

  get popoverPosX() {
    return this.posX;
  }

  get popoverPosY() {
    return this.posY;
  }
}

export {TreeEditService, State};
