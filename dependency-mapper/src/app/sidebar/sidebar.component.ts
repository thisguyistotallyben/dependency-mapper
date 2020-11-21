import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../data.service';

/*
  TODO:
    - Figure out what validation rules are necessary and consolidate them down in one spot
      - Whether that one spot is here or another service, idk yet
    - Also, in general, clean this file up. It's getting a little hairy already
    - Figure out how to go to the next text box on hitting enter
*/

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild("titleField") titleField: ElementRef;

  // state shenanigans
  displayedMenu = 'tickets';
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
    this.displayedMenu = 'quickdeps';
  }

  isDisplayingTags(): boolean {
    return this.displayedMenu == 'quickdeps';
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
