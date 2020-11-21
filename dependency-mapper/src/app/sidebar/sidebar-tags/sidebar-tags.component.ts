import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-tags',
  templateUrl: './sidebar-tags.component.html',
  styleUrls: ['./sidebar-tags.component.scss']
})
export class SidebarTagsComponent implements OnInit {
  // state
  _newTagIsOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleNewTag(): void {
    this._newTagIsOpen = !this._newTagIsOpen;
  }

  newTagIsOpen(): boolean {
    return this._newTagIsOpen;
  }

}
