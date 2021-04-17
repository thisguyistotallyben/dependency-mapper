import { TreeService } from 'src/app/tree/tree.service';
import { DataService, Ticket } from 'src/app/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TreeEditService {
  currentTicket: Ticket;
  _ticketEditIsOpen = false;
  posX = 0;
  posY = 0;

  // state: undefined, edit, children, parents
  state = undefined;

  constructor(
    private dataService: DataService,
    private treeService: TreeService
  ) {
    window['treeEditService'] = this;

    document.onmousemove = (ev) => {
      window['mouse_x'] = ev.pageX;
      window['mouse_y'] = ev.pageY;
    }
  }

  handleTreeClick(nodeId) {
    // check state
    // if undefined, you are editing
    if (!this.state) {
      this.openEdit(nodeId);
    } else if (this.state === 'edit') {
      this.closeEdit();
    } else if (this.state === 'children') {
      this.toggleDependency(this.currentTicket.id, nodeId);
    } else if (this.state === 'parents') {
      this.toggleDependency(nodeId, this.currentTicket.id);
    }
  }

  toggleDependency(parentId, childId) {
    if (this.dataService.dependencyExists(parentId, childId)) {
      this.dataService.removeDependency(parentId, childId);
    } else {
      this.dataService.addDependency(parentId, childId);
    }
    this.treeService.renderTree();
  }

  openEdit(nodeId) {
    this.currentTicket = this.dataService.getTicket(nodeId);
    this.posX = window['mouse_x'];
    this.posY = window['mouse_y'];
    this.state = 'edit';
  }

  closeEdit() {
    this.state = undefined;
  }

  get editIsOpen() {
    return this.state === 'edit';
  }

  get dependenciesAreBeingSet() {
    return this.state === 'parents' || this.state === 'children';
  }

  get currentTicketJiraId(): string {
    return this.currentTicket.jiraId;
  }

  get popoverPosX() {
    return this.posX;
  }

  get popoverPosY() {
    return this.posY;
  }
}
