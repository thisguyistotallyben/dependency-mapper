import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService, Ticket } from 'src/app/data.service';

@Component({
  selector: 'app-ticket-delete',
  templateUrl: './ticket-delete.component.html',
  styleUrls: ['./ticket-delete.component.scss']
})
export class TicketDeleteComponent implements OnInit {
  @Input()
  ticket: Ticket;

  @Output()
  close = new EventEmitter<void>();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  // saving and closing

  handleDelete() {
    this.dataService.removeTicket(this.ticket.id);
    this.closeModal();
  }

  handleCancel() {
    this.closeModal();
  }

  closeModal() {
    this.close.emit();
  }

}
