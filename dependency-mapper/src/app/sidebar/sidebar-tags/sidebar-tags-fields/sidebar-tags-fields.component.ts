import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Tag } from 'src/app/data.service';
import { TagStyle } from 'src/app/tree/tree.service';


class TagFieldsResponse {
  tagId: string;
  name: string;
  bgColor: string;
  borderColor: string;
  borderStyle: string;
  borderWidth: number;
}


@Component({
  selector: 'app-sidebar-tags-fields',
  templateUrl: './sidebar-tags-fields.component.html',
  styleUrls: ['./sidebar-tags-fields.component.scss']
})
class SidebarTagsFieldsComponent implements OnInit {
  @Input() tagStyle: TagStyle;

  @Output() submit = new EventEmitter<TagFieldsResponse>();
  @Output() cancel = new EventEmitter<void>();

  name = '';
  bgColor = '#FFFFFF';
  borderColor = '#000000';
  borderWidth = 2;
  borderStyle = 'solid';

  _backgroundIsSelected = true;
  _borderIsSelected = false;

  constructor() { }

  ngOnInit(): void {
    if (this.tagStyle) {
      this.name = this.tagStyle.tag.value;
      this.bgColor = this.tagStyle.bgColor;
      this.borderColor = this.tagStyle.borderColor;
      this.borderWidth = this.tagStyle.borderWidth;
      this.borderStyle = this.tagStyle.borderStyle;
    }
  }

  cancelTag(): void {
    this.cancel.emit();
  }

  submitTag(): void {
    if (!this.validateFields()) {
      // do something, probably
      return;
    }

    const tagResponse = new TagFieldsResponse();
    tagResponse.tagId = this.tagStyle ? this.tagStyle.tag.id : undefined;
    tagResponse.name = this.name;
    tagResponse.bgColor = this.bgColor;
    tagResponse.borderColor = this.borderColor;
    tagResponse.borderStyle = this.borderStyle;
    tagResponse.borderWidth = this.borderWidth;

    this.submit.emit(tagResponse);
  }

  validateFields(): boolean {
    return true;
  }

  selectBackground(): void {
    this._backgroundIsSelected = true;
    this._borderIsSelected = false;
  }

  backgroundIsSelected(): boolean {
    return this._backgroundIsSelected;
  }

  get isBackgroundSelected(): boolean {
    return this._backgroundIsSelected;
  }

  selectBorder(): void {
    this._borderIsSelected = true;
    this._backgroundIsSelected = false;
  }

  borderIsSelected(): boolean {
    return this._borderIsSelected;
  }

}

export { SidebarTagsFieldsComponent, TagFieldsResponse }
