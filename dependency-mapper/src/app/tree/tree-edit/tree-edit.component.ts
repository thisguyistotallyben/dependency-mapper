import { TreeService } from 'src/app/tree/tree.service';
import { TreeEditService } from './tree-edit.service';
import { Component, OnInit } from '@angular/core';
import { Ticket, DataService } from 'src/app/data.service';

@Component({
  selector: 'app-tree-edit',
  templateUrl: './tree-edit.component.html',
  styleUrls: ['./tree-edit.component.scss']
})
export class TreeEditComponent implements OnInit {
  isDeleting = false;

  constructor(
    private dataService: DataService,
    private treeService: TreeService,
    private treeEditService: TreeEditService) {


    window['treeClick'] = function(nodeId) {
      this.treeEditService.handleTreeClick(nodeId);
    }
  }

  ngOnInit(): void {
  }

  cancelEdit() {
    console.log('yeet');
    this.isDeleting = false;
    this.treeEditService.closeEdit();
  }

  updateTicket(event: any) {
    console.log('updating');
    this.dataService.addTicket(event);
    this.treeEditService.closeEdit();
    this.treeService.renderTree();
  }

  addChildren() {
    this.treeEditService.state = 'children';
  }

  addParents() {
    this.treeEditService.state = 'parents';
  }

  endDependencyEdit() {
    this.treeEditService.state = undefined;
  }

  toggleDeleteTicket() {
    this.isDeleting = !this.isDeleting;
  }

  deleteTicket() {
    this.dataService.removeTicket(this.treeEditService.currentTicket.id);
    this.treeEditService.state = undefined;
    this.treeService.renderTree();
  }

  goToJira() {
    const jiraId = this.treeEditService.currentTicketJiraId;
    console.log(this.dataService.generateUrl(jiraId));
    window.open(this.dataService.generateUrl(jiraId), "_blank");
  }

  get posX():string {
    // console.log('big stonks', window['mouse_x'] + 'px');
    return this.treeEditService.popoverPosX + 'px';
  }

  get posY():string {
    // console.log('big stonks', window['mouse_x'] + 'px');
    return this.treeEditService.popoverPosY + 'px';
  }

  get ticketToEdit(): Ticket {
    return this.treeEditService.currentTicket;
  }

  get isDisplayed() {
    return this.treeEditService.editIsOpen;
  }

  get dependenciesAreBeingSet() {
    return this.treeEditService.dependenciesAreBeingSet;
  }

  get ticketHasJiraLink() {
    return this.treeEditService.currentTicketJiraId !== '';
  }
}
