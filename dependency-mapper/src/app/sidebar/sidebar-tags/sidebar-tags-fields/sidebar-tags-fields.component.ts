import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-tags-fields',
  templateUrl: './sidebar-tags-fields.component.html',
  styleUrls: ['./sidebar-tags-fields.component.scss']
})
export class SidebarTagsFieldsComponent implements OnInit {
  bgColor = '#FFFFFF';
  borderColor = '#000000';
  borderWidth = 2;
  borderType = 'solid';

  constructor() { }

  ngOnInit(): void {
  }

}
