import { Ticket } from 'src/app/data.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-tickets-entry',
  templateUrl: './sidebar-tickets-entry.component.html',
  styleUrls: ['./sidebar-tickets-entry.component.scss']
})
export class SidebarTicketsEntryComponent implements OnInit {
  @Input()
  ticket: Ticket;

  editingTicket = false;
  settingDependencies = false;
  deletingTicket = false;

  constructor() { }

  ngOnInit(): void {
    console.log('ticket', this.ticket);
  }

  get title(): string {
    console.log('getting title:', this.ticket);
    return this.ticket.title;
  }

  /* state setting/checking */

  toggleDependencies(): void {
    this.settingDependencies = !this.settingDependencies;
    if (this.settingDependencies) {
      this.editingTicket = false;
      this.deletingTicket = false;
    }
  }

  isSettingDependencies(): boolean {
    return this.settingDependencies;
  }

  toggleEdit(): void {
    this.editingTicket = !this.editingTicket;
    if (this.editingTicket) {
      this.settingDependencies = false;
      this.deletingTicket = false;
    }
  }

  isEditing(): boolean {
    return this.editingTicket;
  }

  toggleDelete(): void {
    this.deletingTicket = !this.deletingTicket;
    if (this.deletingTicket) {
      this.settingDependencies = false;
      this.editingTicket = false;
    }
  }

  isDeleting(): boolean {
    return this.deletingTicket;
  }

}
