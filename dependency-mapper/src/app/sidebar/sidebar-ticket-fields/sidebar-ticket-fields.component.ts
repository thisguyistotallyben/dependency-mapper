import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService, Ticket } from 'src/app/data.service';

@Component({
  selector: 'app-sidebar-ticket-fields',
  templateUrl: './sidebar-ticket-fields.component.html',
  styleUrls: ['./sidebar-ticket-fields.component.scss']
})
export class SidebarTicketFieldsComponent implements OnInit {
  id: string;
  jiraId: string;
  title: string;
  description: string;
  currentTicket: Ticket;

  @Input() ticketId: string;

  @Output() submit = new EventEmitter<Ticket>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    if (this.ticketId) {
      this.currentTicket = this.dataService.getTicket(this.ticketId);
      this.id = this.currentTicket.id;
      this.jiraId = this.currentTicket.jiraId;
      this.title = this.currentTicket.title;
      this.description = this.currentTicket.description;
    }
  }

  submitTicket(): void {
    if (!this.validInputs()) {
      return;
    }
    let ticket = new Ticket();
    ticket.id = this.id ? this.id : '';
    ticket.jiraId = this.jiraId ? this.jiraId : '';
    ticket.title = this.title ? this.title : '';
    ticket.description = this.description ? this.description :  '';

    this.submit.emit(ticket);
  }

  cancelInput(): void {
    this.cancel.emit();
  }

  // ACTUALLY DO THIS BIT
  validInputs(): boolean {
    return true;
  }

}
