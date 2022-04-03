import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService, Group, Ticket } from '../data.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  @ViewChild("titleField") titleField: ElementRef;

  tagsMenuOpen = false;
  newTicketOpen = false;
  isEditingTitle = false;
  groupMenuOpen = false;

  constructor(private changeDetector: ChangeDetectorRef, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.titleObserver.subscribe(
      x => this.changeDetector.detectChanges(),
      err => console.error('oopsie poopsie', err),
      () => console.warn('title observer finished')
    );
  }

  toggleTagsMenu() {
    this.tagsMenuOpen = !this.tagsMenuOpen;
  }

  startTitleEdit() {
    this.isEditingTitle = true;

    this.changeDetector.detectChanges(); // required for focusing
    this.titleField.nativeElement.focus();
  }

  stopTitleEdit() {
    this.isEditingTitle = false;
  }

  toggleGroupMenu() {
    this.groupMenuOpen = !this.groupMenuOpen;
    this.changeDetector.detectChanges();
  }

  toggleNewTicket() {
    this.newTicketOpen = !this.newTicketOpen;
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
