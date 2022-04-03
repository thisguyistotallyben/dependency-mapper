import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DataService, Ticket } from '../data.service';

/*
  Re-do the data stuff like the tag item class where there is a second Ticket that holds the state
  so there's no setting and resetting stuff constantly.
*/

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
  url: string;
  description: string;
  tagId: string;
  groupId: string;

  @Output()
  close = new EventEmitter<Ticket>();

  constructor(private changeDetector: ChangeDetectorRef, private dataService: DataService) { }

  ngOnInit(): void {
    if (this.hasTicket) {
      this.title = this.ticket.title;
      this.url = this.ticket.url;
      this.description = this.ticket.description;
      this.tagId = this.ticket.tagId;
      this.groupId = this.ticket.groupId;
    }

    this.changeDetector.detectChanges();
    this.inputField.nativeElement.focus();
  }

  // editing

  updateTag(event: any) {
    this.tagId = event;
  }

  updateGroup(event: any) {
    this.groupId = event;
  }

  // saving and closing

  handleSave() {
    if (!this.hasTicket) {
      this.ticket = new Ticket();
    }

    this.ticket.title = this.title || '';
    this.ticket.url = this.url || '';
    this.ticket.description = this.description || '';
    this.ticket.tagId = this.tagId || '';
    this.ticket.groupId = this.groupId || '';
    this.dataService.addTicket(this.ticket);

    this.closeModal();
  }

  handleCancel() {
    this.closeModal();
  }

  closeModal() {
    this.close.emit(this.ticket);
  }

  // getters

  get hasTicket(): boolean {
    return !!this.ticket;
  }

  get tags() {
    return [{id: '', value: '--None--'}].concat(this.dataService.tags);
  }

  get groups() {
    return [{id: '', value: '--None--'}].concat(this.dataService.groups);
  }
}
