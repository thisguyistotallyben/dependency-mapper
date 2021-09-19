import { Component, OnInit } from '@angular/core';
import { DataService, Ticket } from '../data.service';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  tagsMenuOpen = false;
  newTicketOpen = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  // temporary
  toggleNewTicket() {
    this.newTicketOpen = !this.newTicketOpen;
    // const ticket = new Ticket();
    // ticket.title = 'Wow a Ticket';
    // ticket.description = 'Yes, a ticket this is';
    // this.dataService.addTicket(ticket);
  }

  createNewMap() {
    console.warn('navigate to home page???')
  }

  toggleTagsMenu() {
    this.tagsMenuOpen = !this.tagsMenuOpen;
  }

  get hasDBEntry(): boolean {
    return this.dataService.mapId && this.dataService.mapId !== '';
  }

  get title() {
    return this.dataService.title;
  }

  set title(val) {
    this.dataService.setTitle(val);
  }
}
