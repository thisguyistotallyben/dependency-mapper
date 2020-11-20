import { Component, OnInit } from '@angular/core';
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
  // state shenanigans
  displayedMenu = 'tickets';
  isHidden = false;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {

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

}
