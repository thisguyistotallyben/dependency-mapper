import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService, Ticket } from '../data.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  @ViewChild("titleField") titleField: ElementRef;

  tagsMenuOpen = true;
  newTicketOpen = false;
  isEditingTitle = false;

  constructor(private changeDetector: ChangeDetectorRef, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.titleObserver.subscribe(
      x => this.changeDetector.detectChanges(),
      err => console.error('oopsie poopsie', err),
      () => console.warn('title observer finished')
    );
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

  toggleEditTitle() {
    this.isEditingTitle = !this.isEditingTitle;

    if (this.isEditingTitle) {
      this.changeDetector.detectChanges(); // required for focusing
      this.titleField.nativeElement.focus();
    }
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
