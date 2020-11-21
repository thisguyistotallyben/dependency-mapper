import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild("titleField") titleField: ElementRef;

  // state shenanigans
  // displayedMenu = 'tickets';
  displayedMenu = 'tags';
  isHidden = false;
  _title: string;
  _isEditingTitle: boolean;

  constructor(
    private changeDetector: ChangeDetectorRef,
    public dataService: DataService) { }

  ngOnInit(): void {
    this._title = this.dataService.getTitle();
  }

  get title(): string {
    this._title = this.dataService.getTitle();
    return this._title;
  }

  set title(title: string) {
    this.dataService.setTitle(title);
    this._title = title;
  }

  selectTickets(): void {
    this.displayedMenu = 'tickets';
  }

  isDisplayingTickets(): boolean {
    return this.displayedMenu == 'tickets';
  }

  selectTags() {
    this.displayedMenu = 'tags';
  }

  isDisplayingTags(): boolean {
    return this.displayedMenu == 'tags';
  }

  selectSettings() {
    this.displayedMenu = 'settings';
  }

  isDisplayingSettings(): boolean {
    return this.displayedMenu == 'settings';
  }

  toggleSidebar(): void {
    this.isHidden = !this.isHidden;
    console.log(this.isHidden);
  }

  sidebarIsHidden(): boolean {
    return this.isHidden;
  }

  editTitle(): void {
    if (!this.dataService.getTitle()) {
      this._title = '';
    }
    this._isEditingTitle = true;

    this.changeDetector.detectChanges();
    this.titleField.nativeElement.focus();
  }

  stopEditingTicket(): void {
    this._isEditingTitle = false;
  }

  isEditingTitle(): boolean {
    return this._isEditingTitle;
  }

}
