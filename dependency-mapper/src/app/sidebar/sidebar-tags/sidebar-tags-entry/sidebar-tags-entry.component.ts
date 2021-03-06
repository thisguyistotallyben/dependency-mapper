import { DataService, Tag } from 'src/app/data.service';
import { TagStyle, TreeService } from 'src/app/tree/tree.service';
import { Component, Input, OnInit } from '@angular/core';
import { TagFieldsResponse } from '../sidebar-tags-fields/sidebar-tags-fields.component';

@Component({
  selector: 'app-sidebar-tags-entry',
  templateUrl: './sidebar-tags-entry.component.html',
  styleUrls: ['./sidebar-tags-entry.component.scss']
})
export class SidebarTagsEntryComponent implements OnInit {
  @Input() tagStyle: TagStyle;
  tag: Tag;

  _isEditing = false;
  _isDeleting = false;

  constructor(
    private dataService: DataService,
    private treeService: TreeService
  ) { }

  ngOnInit(): void {
    this.tag = this.dataService.getTag(this.tagStyle.tagId);
  }

  get title(): string {
    return this.tag.value;
  }

  get isEditing(): boolean {
    return this._isEditing;
  }

  get isDeleting(): boolean {
    return this._isDeleting;
  }

  toggleEdit(): void {
    this._isEditing = !this._isEditing;
    if (this.isEditing) {
      this._isDeleting = false;
    }
  }

  toggleDelete(): void {
    this._isDeleting = !this._isDeleting;
    if (this.isDeleting) {
      this._isEditing = false;
    }
  }

  // DOES THIS NEED TO LIVE HERE? SEEMS KINDA WACK, PAST ME
  updateTagStyle(event: TagFieldsResponse): void {
    if (event.name !== this.tag.value) {
      this.tag.value = event.name;
      this.dataService.insertOrUpdateTag(this.tag);
    }

    this.tagStyle.bgColor = event.bgColor;
    this.tagStyle.borderColor = event.borderColor;
    this.tagStyle.borderStyle = event.borderStyle;
    this.tagStyle.borderWidth = event.borderWidth;
    this.tagStyle.textColor = event.textColor;

    this.treeService.addTagStyle(this.tagStyle);
    this.toggleEdit();
    this.treeService.renderTree();
  }

}
