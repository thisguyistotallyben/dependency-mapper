import { TreeService, TagStyle } from 'src/app/tree/tree.service';
import { DataService, Tag } from 'src/app/data.service';
import { Component, OnInit } from '@angular/core';
import { TagFieldsResponse } from './sidebar-tags-fields/sidebar-tags-fields.component';

@Component({
  selector: 'app-sidebar-tags',
  templateUrl: './sidebar-tags.component.html',
  styleUrls: ['./sidebar-tags.component.scss']
})
export class SidebarTagsComponent implements OnInit {
  // state
  _newTagIsOpen = false;

  constructor(
    private dataService: DataService,
    private treeService: TreeService
  ) { }

  ngOnInit(): void {
  }

  toggleNewTag(): void {
    this._newTagIsOpen = !this._newTagIsOpen;
  }

  newTagIsOpen(): boolean {
    return this._newTagIsOpen;
  }

  addNewTag(event: TagFieldsResponse): void {
    const tagStyle = new TagStyle();

    tagStyle.tagId = this.dataService.addTag(new Tag(event.name)).id;
    tagStyle.bgColor = event.bgColor;
    tagStyle.borderColor = event.borderColor;
    tagStyle.borderWidth = event.borderWidth;
    tagStyle.borderStyle = event.borderStyle;
    tagStyle.textColor = event.textColor;

    this.treeService.addTagStyle(tagStyle);

    this._newTagIsOpen = false;
  }

  get tagStyles(): Array<TagStyle> {
    return this.treeService.getTagStyles()
  }

}
