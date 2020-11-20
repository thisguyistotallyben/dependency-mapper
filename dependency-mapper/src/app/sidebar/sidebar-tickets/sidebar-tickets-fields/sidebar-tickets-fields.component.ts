import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService, Ticket } from 'src/app/data.service';

@Component({
  selector: 'app-sidebar-tickets-fields',
  templateUrl: './sidebar-tickets-fields.component.html',
  styleUrls: ['./sidebar-tickets-fields.component.scss']
})
export class SidebarTicketsFieldsComponent implements OnInit {
  id: string;
  jiraId: string;
  title: string;
  description: string;

  @Input() ticket: Ticket;

  @Output() submit = new EventEmitter<Ticket>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    if (this.ticket) {
      this.id = this.ticket.id;
      this.jiraId = this.ticket.jiraId;
      this.title = this.ticket.title;
      this.description = this.ticket.description;
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
