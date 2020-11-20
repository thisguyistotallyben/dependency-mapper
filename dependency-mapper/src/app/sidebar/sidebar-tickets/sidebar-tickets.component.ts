import { TreeService } from 'src/app/tree/tree.service';
import { DataService, Ticket } from 'src/app/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-tickets',
  templateUrl: './sidebar-tickets.component.html',
  styleUrls: ['./sidebar-tickets.component.scss']
})
export class SidebarTicketsComponent implements OnInit {
  // state shenanigans
  makingNewTicket = false;

  constructor(
    private dataService: DataService,
    private treeService: TreeService
  ) { }

  ngOnInit(): void {
  }

  get tickets(): Array<Ticket> {
    return this.dataService.tickets;
  }

  toggleNewTicket(): void {
    this.makingNewTicket = !this.makingNewTicket;
  }

  newTicketIsOpen(): boolean {
    return this.makingNewTicket;
  }

  cancelNewTicket(): void {
    this.makingNewTicket = false;
  }

  addNewTicket(event: Ticket): void {
    this.dataService.addTicket(event);
    this.makingNewTicket = false;
    this.treeService.renderTree();
  }

  copyUrl(): void {
    console.log(this.dataService.exportURL());
  }

}