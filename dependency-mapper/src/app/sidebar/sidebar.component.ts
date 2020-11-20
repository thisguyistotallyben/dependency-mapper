import { Component, OnInit } from '@angular/core';
import { DataService, Ticket } from '../data.service';
import { TreeService } from '../tree/tree.service';

/*
  TODO:
    - Figure out what validation rules are necessary and consolidate them down in one spot
      - Whether that one spot is here or another service, idk yet
    - Also, in general, clean this file up. It's getting a little hairy already
    - Figure out how to go to the next text box on hitting enter
*/

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  // state shenanigans
  displayedMenu = 'tickets';
  isHidden = false;

  constructor(
    public dataService: DataService,
    private treeService: TreeService
  ) { }

  ngOnInit(): void {

  }

  selectTickets(): void {
    this.displayedMenu = 'tickets';
  }

  isDisplayingTickets(): boolean {
    return this.displayedMenu == 'tickets';
  }

  selectTags() {
    this.displayedMenu = 'quickdeps';
  }

  isDisplayingTags(): boolean {
    return this.displayedMenu == 'quickdeps';
  }

  selectSettings() {
    this.displayedMenu = 'settings';
  }

  isDisplayingSettings(): boolean {
    return this.displayedMenu == 'settings';
  }

  toggleSidebar(): void {
    console.log('toggling');
    this.isHidden = !this.isHidden;
    console.log(this.isHidden);
  }

  sidebarIsHidden(): boolean {
    return this.isHidden;
  }

}




// @Component({
//   selector: 'app-sidebar',
//   templateUrl: './sidebar.component.html',
//   styleUrls: ['./sidebar.component.scss']
// })
// export class SidebarComponent implements OnInit {
//   things: Array<string>;

//   // state shenanigans
//   displayingTickets = true;
//   creatingTicket = false;
//   addingDependencies = false;
//   selectedTickets: Set<string> = new Set<string>();
//   ticketShowingDependencies = '';
//   ticketBeingEdited = '';
//   ticketBeingDeleted = '';
//   isMakingNewTicket = false;

//   ticketToEdit: Ticket;

//   // quick dependencies
//   quickDepParentTitle: string = '';
//   quickDepChildTitle: string = '';

//   constructor(
//     public dataService: DataService,
//     private treeService: TreeService) { }

//   ngOnInit(): void {
//     this.things = new Array<string>();
//     this.things.push('heck yeah');
//   }

//   openNewTicket(): void {
//     this.ticketShowingDependencies = '';
//     this.ticketBeingEdited = '';
//     this.isMakingNewTicket = true;
//   }

//   closeNewTicket(): void {
//     this.isMakingNewTicket = false;
//   }

//   toggleConfirmRemoveTicket(id: string): void {
//     if (this.ticketBeingDeleted == id) {
//       this.ticketBeingDeleted = '';
//     } else {
//       this.ticketShowingDependencies = '';
//       this.ticketBeingEdited = '';
//       this.ticketBeingDeleted = id;
//     }
//   }

//   removeTicket(id: string): void {
//     console.log('removing: ', id);
//     this.dataService.removeTicket(id);
//     this.refreshTree();
//   }

//   createQuickDependency() {

//     let parentTicket = this.dataService.getTicketByTitle(this.quickDepParentTitle);
//     let childTicket = this.dataService.getTicketByTitle(this.quickDepChildTitle);

//     if (
//       parentTicket &&
//       childTicket &&
//       this.dataService.dependencyExists(parentTicket.id, childTicket.id)
//     ) {
//       console.log('dependency already exists');
//       return;
//     }

//     // create tickets if they don't exist
//     if (!parentTicket) {
//       let ticket = new Ticket();
//       ticket.title = this.quickDepParentTitle;
//       parentTicket = this.dataService.addTicket(ticket);
//       console.log('parentTicket', parentTicket);
//     }
//     if (!childTicket) {
//       let ticket = new Ticket();
//       ticket.title = this.quickDepChildTitle;
//       childTicket = this.dataService.addTicket(ticket);
//       console.log('childTicket', childTicket);
//     }

//     this.dataService.addDependency(parentTicket.id, childTicket.id);
//     this.refreshTree();
//   }

//   toggleSelection(id: string): void {
//     console.log('pushing', id);
//     if (this.isSelected(id)) {
//       this.selectedTickets.delete(id);
//     } else {
//       this.selectedTickets.add(id);
//     }
//   }

//   isSelected(id: string): boolean {
//     return this.selectedTickets.has(id);
//   }

//   ticketIsExpanded(id: string): boolean {
//     return this.ticketShowingDependencies === id || this.ticketBeingEdited === id || this.ticketBeingDeleted === id;

//   }

//   toggleDependencies(id: string): void {
//     if (this.ticketShowingDependencies === id) {
//       this.ticketShowingDependencies = '';
//     } else {
//       this.ticketBeingEdited = '';
//       this.ticketBeingDeleted = '';
//       this.ticketShowingDependencies = id;
//     }
//   }

//   addTicket(event: Ticket, editing: boolean): void {
//     console.log('BIG YEE HAW', event);
//     this.dataService.addTicket(event);
//     this.refreshTree();
//     this.isMakingNewTicket = false;
//     this.ticketBeingEdited = '';
//     if (!editing) {
//       this.ticketShowingDependencies = event.id;
//     }
//   }

//   toggleEditTicket(id: string): void {
//     if (this.ticketBeingEdited == id) {
//       this.ticketBeingEdited = '';
//     } else {
//       this.ticketShowingDependencies = '';
//       this.ticketBeingDeleted = '';
//       this.ticketBeingEdited = id;
//       console.log(id);
//     }
//   }

//   refreshTree(): void {
//     this.treeService.renderTree();
//   }

//   // THESE FUNCTIONS NEED BETTER NAMES
//   // I'M CURRENTLY ALSO USING THEM FOR CHECKING IF STUFF IS OPEN
//   shouldHaveControlBg(id: string): boolean {
//     return id == this.ticketBeingEdited || id == this.ticketShowingDependencies;
//   }

//   shouldHaveDeleteBg(id: string): boolean {
//     return id == this.ticketBeingDeleted;
//   }

// }
