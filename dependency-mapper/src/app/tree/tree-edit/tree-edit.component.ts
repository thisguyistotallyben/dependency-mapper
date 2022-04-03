import { TreeEditService, State } from './tree-edit.service';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ticket, DataService } from 'src/app/data.service';

@Component({
  selector: 'app-tree-edit',
  templateUrl: './tree-edit.component.html',
  styleUrls: ['./tree-edit.component.scss']
})
export class TreeEditComponent implements OnInit {
  @ViewChild("popover") popoverField: ElementRef;

  isDeleting = false;
  isEditTicketOpen = false;

  posXOffset = 0;
  posYOffset = 0;

  isSubmenuOpen = false;
  submenuPosX;
  submenuPosY;

  isEditingTicket; // replace isEditTicketOpen with this
  isEditingGroup = false;
  isEditingParents = false;
  isEditingChildren = false;

  currentTicket: Ticket;
  hasValidUrl = true;

  parentTicketId;
  childTicketId;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private dataService: DataService,
    private treeEditService: TreeEditService) {
      window['treeClick'] = function(nodeId) {
        this.treeEditService.handleTreeClick(nodeId);
      }
  }

  // temp land

  closePopover() {
    if (this.isSubmenuOpen) {
      return;
    }

    this.hasValidUrl = true;
    this.treeEditService.closeMenu();
    this.posXOffset = 0;
    this.posYOffset = 0;
  }

  openSubmenu() {
    this.submenuPosX = window['mouse_x'] + 'px';
    this.submenuPosY = window['mouse_y'] + 'px';

    this.isSubmenuOpen = true;
    this.changeDetector.detectChanges();
  }

  closeSubmenu() {
    this.isSubmenuOpen = false;
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {
    this.treeEditService.stateObserver.subscribe(
      x => {
        if (x == State.Menu) {
          this.currentTicket = this.dataService.getTicket(this.treeEditService.currentNodeId);
          this.changeDetector.detectChanges()
        } else if (x == State.EditNode) {
          this.handleTicketSelections();
        } else if (x == State.EditGroup) {
          this.handleGroupTicketSelections();
        } else {
          this.changeDetector.detectChanges()
        }
      },
      err => console.error(err),
      () => console.warn('tree state observer done')
    );
  }

  createChildTicket() {
    this.parentTicketId = this.currentTicket.id;
    this.toggleEditTicket();
  }

  createParentTicket() {
    this.childTicketId = this.currentTicket.id;
    this.toggleEditTicket();
  }

  toggleEditTicket() {
    this.isEditTicketOpen = !this.isEditTicketOpen;
    this.changeDetector.detectChanges();
  }

  // this should probably fire on page size changes, too
  handlePosition(position: any) {
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;
    const popoverWidth = position.width;
    const popoverHeight = position.height;
    const mouseX = this.treeEditService.popoverPosX;
    const mouseY = this.treeEditService.popoverPosY;

    if (mouseX + popoverWidth > pageWidth) {
      this.posXOffset = 0 - popoverWidth;
    }

    if (mouseY + popoverHeight > pageHeight) {
      this.posYOffset = 0 - popoverHeight;
    }

    this.changeDetector.detectChanges();
  }

  handlePostEditTicket(ticket: Ticket): void {
    if (ticket) {
      if (this.parentTicketId) {
        this.dataService.addDependency(this.parentTicketId, ticket.id);
      }
      if (this.childTicketId) {
        this.dataService.addDependency(ticket.id, this.childTicketId);
      }
    }

    this.parentTicketId = undefined;
    this.childTicketId = undefined;
    this.treeEditService.closeMenu();
    this.toggleEditTicket();
  }

  handleTicketSelections() {
    let addedSelections = [];
    let removedSelections = [];
    const currentId = this.currentTicket.id;

    // do the things with the selections
    this.treeEditService.selections.forEach(selectedId => {
      const depExists = this.isEditingParents
        ? this.dataService.dependencyExists(selectedId, currentId)
        : this.dataService.dependencyExists(currentId, selectedId);

      if (depExists) {
        removedSelections.push(selectedId);
      } else {
        addedSelections.push(selectedId);
      }
    });

    this.treeEditService.stagedAddedSelections = addedSelections;
    this.treeEditService.stagedRemovedSelections = removedSelections;
    this.dataService.genericObserver.next();
  }

  handleGroupTicketSelections() {
    let addedSelections = [];
    let removedSelections = [];
    const currentGroupTicketIds = this.dataService.getGroupTickets(this.treeEditService.currentNodeId)
      .map(ticket => ticket.id);

    this.treeEditService.selections.forEach(selectedId => {
      if (currentGroupTicketIds.includes(selectedId)) {
        removedSelections.push(selectedId);
      } else {
        addedSelections.push(selectedId);
      }
    });

    this.treeEditService.stagedAddedSelections = addedSelections;
    this.treeEditService.stagedRemovedSelections = removedSelections;
    this.dataService.genericObserver.next();
  }

  updateTicket(event: any) {
    this.dataService.addTicket(event);
    this.treeEditService.closeMenu();
    this.dataService.ticketObserver.next();
  }

  setParents() {
    this.isEditingParents = true;
    this.isEditingChildren = false;
    this.treeEditService.state = State.EditNode;

    this.treeEditService.preAddedSelections = this.dataService
      .getParentDependencies(this.currentTicket.id)
      .map(dep => dep.parentId);

    this.dataService.genericObserver.next();
    this.changeDetector.detectChanges();
  }

  setChildren() {
    this.isEditingParents = false;
    this.isEditingChildren = true;
    this.treeEditService.state = State.EditNode;

    this.treeEditService.preAddedSelections = this.dataService
      .getChildDependencies(this.currentTicket.id)
      .map(dep => dep.childId);

    this.dataService.genericObserver.next();
    this.changeDetector.detectChanges();
  }

  cancelEdit() {
    this.isEditingParents = false;
    this.isEditingChildren = false;
    this.treeEditService.state = State.View;

    this.treeEditService.clearSelections();
    this.dataService.genericObserver.next();
    this.changeDetector.detectChanges();
  }

  endEdit() {
    if (this.treeEditService.state == State.EditGroup) {
      this.treeEditService.stagedAddedSelections.forEach(id => {
        const ticket = this.dataService.getTicket(id);
        ticket.groupId = this.treeEditService.currentNodeId;
        this.dataService.addTicket(ticket);
      });

      this.treeEditService.stagedRemovedSelections.forEach(id => {
        const ticket = this.dataService.getTicket(id);
        ticket.groupId = '';
        this.dataService.addTicket(ticket);
      });
    } else {
      const currentId = this.currentTicket.id;

      this.treeEditService.stagedAddedSelections.forEach(selectedId => {
        const parentId = this.isEditingParents ? selectedId : currentId;
        const childId = this.isEditingParents ? currentId : selectedId;
        this.dataService.addDependency(parentId, childId);
      });

      this.treeEditService.stagedRemovedSelections.forEach(selectedId => {
        const parentId = this.isEditingParents ? selectedId : currentId;
        const childId = this.isEditingParents ? currentId : selectedId;
        this.dataService.removeDependency(parentId, childId);
      });
    }

    this.cancelEdit();
  }

  toggleDeleteTicket() {
    this.isDeleting = !this.isDeleting;
    this.changeDetector.detectChanges();
  }

  deleteTicket() {
    this.dataService.removeTicket(this.currentTicket.id);
    this.isDeleting = false;
    this.treeEditService.state = State.View;

    this.dataService.ticketObserver.next();
  }

  goToURL() {
    let url = this.currentTicket.url;
    if (!url.includes('//')) {
      url = 'http://' + url;
    }

    window.open(url, "_blank");
  }

  get formattedUrl(): string {
    return this.treeEditService.formatUrl(this.currentTicket.url);
  }

  get UrlHostname(): string {
    return this.treeEditService.getURLHostname(this.currentTicket.url);
  }

  get posX():string {
    const positon = this.treeEditService.popoverPosX + this.posXOffset;
    return positon + 'px';
  }

  get posY():string {
    const positon = this.treeEditService.popoverPosY + this.posYOffset;
    return positon + 'px';
  }

  get ticketToEdit(): Ticket {
    if (this.parentTicketId || this.childTicketId) {
      return undefined;
    }

    return this.currentTicket;
  }

  get isDisplayed() {
    return this.treeEditService.menuIsOpen;
  }

  get isClickOutsideToCloseEnabled() {
    // idk something is screwy here I think
    return this.isDisplayed;
  }

  get isEditing() {
    return this.treeEditService.state == State.EditNode ||
      this.treeEditService.state == State.EditGroup;
  }

  get editMessage() {
    if (this.isEditingParents) {
      return 'Setting Parents of';
    }
    if (this.isEditingChildren) {
      return 'Setting Children of';
    }

    return 'Editing';
  }

  get editTitle() {
    const id = this.treeEditService.currentNodeId;
    switch(this.treeEditService.state) {
      case State.EditNode:
        return this.dataService.getTicket(id).title;
      case State.EditGroup:
        return this.dataService.getGroup(id).value;
    }
  }

  get ticketHasURL() {
    return this.currentTicket.url !== '';
  }

  get faviconURL() {
    return this.treeEditService.getUrlOrigin(this.currentTicket.url) + '/favicon.ico';
  }

  handleIconLoadError() {
    this.hasValidUrl = false;
    this.changeDetector.detectChanges();
  }
}
