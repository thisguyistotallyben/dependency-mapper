import { JiraService } from './../../jira/jira.service';
import { TreeService } from 'src/app/tree/tree.service';
import { TreeEditService } from './tree-edit.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Ticket, DataService } from 'src/app/data.service';

@Component({
  selector: 'app-tree-edit',
  templateUrl: './tree-edit.component.html',
  styleUrls: ['./tree-edit.component.scss']
})
export class TreeEditComponent implements OnInit {
  isDeleting = false;
  isEditTicketOpen = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private dataService: DataService,
    private treeService: TreeService,
    private jiraService: JiraService,
    private treeEditService: TreeEditService) {


    window['treeClick'] = function(nodeId) {
      this.treeEditService.handleTreeClick(nodeId);
    }
  }

  // temp land

  closePopover() {
    console.log('wow a thing');
    this.treeEditService.closeEdit();
  }

  ngOnInit(): void {
    this.treeEditService.stateObserver.subscribe(
      x => this.changeDetector.detectChanges(),
      err => console.error(err),
      () => console.warn('tree state observer done')
    );
  }

  toggleEditTicket() {
    this.treeEditService.closeEdit();
    this.isEditTicketOpen = !this.isEditTicketOpen;
    this.changeDetector.detectChanges();
  }

  cancelEdit() {
    this.isDeleting = false;
    this.treeEditService.closeEdit();
  }

  updateTicket(event: any) {
    this.dataService.addTicket(event);
    this.treeEditService.closeEdit();
    this.treeService.renderTree();
  }

  setChildren() {
    this.treeEditService.state = 'children';
    this.changeDetector.detectChanges();
  }

  setParents() {
    this.treeEditService.state = 'parents';
    this.changeDetector.detectChanges();
  }

  endDependencyEdit() {
    this.treeEditService.state = undefined;
    this.changeDetector.detectChanges();
  }

  toggleDeleteTicket() {
    this.treeEditService.closeEdit();
    this.isDeleting = !this.isDeleting;
    this.changeDetector.detectChanges();
  }

  deleteTicket() {
    this.dataService.removeTicket(this.treeEditService.currentTicket.id);
    this.isDeleting = false;
    this.treeEditService.state = undefined;
    this.treeService.renderTree();
  }

  goToJira() {
    const jiraId = this.treeEditService.currentTicketJiraId;
    window.open(this.dataService.generateUrl(jiraId), "_blank");
  }

  get posX():string {
    return this.treeEditService.popoverPosX + 'px';
  }

  get posY():string {
    return this.treeEditService.popoverPosY + 'px';
  }

  get ticketToEdit(): Ticket {
    return this.treeEditService.currentTicket;
  }

  get isDisplayed() {
    return this.treeEditService.editIsOpen;
  }

  get isClickOutsideToCloseEnabled() {
    return this.treeEditService.state === 'edit'; // might be a function for this
  }

  get dependenciesAreBeingSet() {
    return this.treeEditService.dependenciesAreBeingSet;
  }

  get editMessage() {
    switch(this.treeEditService.state) {
      case 'parents': return 'Setting Parents of';
      case 'children': return 'Setting Children of';
      default: return 'Editing';
    }
  }

  get ticketHasJiraLink() {
    return this.treeEditService.currentTicketJiraId !== '';
  }

  get jiraIsEnabled(): boolean {
    return this.jiraService.isEnabled;
  }
}
