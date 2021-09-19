import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DataService, Ticket } from '../data.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  @ViewChild("inputField") inputField: ElementRef;

  @Input()
  ticket: Ticket;

  // state stuff
  title: string;
  jiraId: string;
  description: string;
  tagId: string;

  @Output()
  close = new EventEmitter<void>();

  constructor(private changeDetector: ChangeDetectorRef, private dataService: DataService) { }

  ngOnInit(): void {
    if (this.hasTicket) {
      this.title = this.ticket.title;
      this.jiraId = this.ticket.jiraId;
      this.description = this.ticket.description;
      this.tagId = this.ticket.tagId;
    }

    this.changeDetector.detectChanges();
    this.inputField.nativeElement.focus();
  }

  // editing

  updateTag(event: any) {
    this.tagId = event;
  }

  // saving and closing

  handleSave() {
    if (!this.hasTicket) {
      this.ticket = new Ticket();
    }

    this.ticket.title = this.title || '';
    this.ticket.jiraId = this.jiraId || '';
    this.ticket.description = this.description || '';
    this.ticket.tagId = this.tagId || '';
    this.dataService.addTicket(this.ticket);

    this.closeModal();
  }

  handleCancel() {
    this.closeModal();
  }

  closeModal() {
    this.close.emit();
  }

  // getters

  get hasTicket(): boolean {
    return !!this.ticket;
  }

  get jiraIsEnabled(): boolean {
    return true; // lol
  }

  get tags() {
    return [{id: undefined, value: '--None--'}].concat(this.dataService.tags);
  }
}
