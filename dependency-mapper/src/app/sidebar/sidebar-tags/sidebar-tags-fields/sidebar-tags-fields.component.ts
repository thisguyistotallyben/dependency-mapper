import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Tag, DataService } from 'src/app/data.service';
import { TagStyle } from 'src/app/tree/tree.service';


class TagFieldsResponse {
  tagId: string;
  name: string;
  bgColor: string;
  borderColor: string;
  borderStyle: string;
  borderWidth: number;
  textColor: string;
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
  textColor = '#000000'

  _backgroundIsSelected = true;
  _borderIsSelected = false;
  _textIsSelected = false;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    if (this.tagStyle) {
      this.name = this.dataService.getTag(this.tagStyle.tagId).value;
      this.bgColor = this.tagStyle.bgColor;
      this.borderColor = this.tagStyle.borderColor;
      this.borderWidth = this.tagStyle.borderWidth;
      this.borderStyle = this.tagStyle.borderStyle;
      this.textColor = this.tagStyle.textColor;
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
    tagResponse.tagId = this.tagStyle ? this.tagStyle.tagId : undefined;
    tagResponse.name = this.name;
    tagResponse.bgColor = this.bgColor;
    tagResponse.borderColor = this.borderColor;
    tagResponse.borderStyle = this.borderStyle;
    tagResponse.borderWidth = this.borderWidth;
    tagResponse.textColor = this.textColor;

    this.submit.emit(tagResponse);
  }

  validateFields(): boolean {
    return true;
  }

  selectBackground(): void {
    this._borderIsSelected = false;
    this._backgroundIsSelected = true;
    this._textIsSelected = false;
  }

  get backgroundIsSelected(): boolean {
    return this._backgroundIsSelected;
  }

  selectBorder(): void {
    this._borderIsSelected = true;
    this._backgroundIsSelected = false;
    this._textIsSelected = false;
  }

  get borderIsSelected(): boolean {
    return this._borderIsSelected;
  }

  selectText(): void {
    this._borderIsSelected = false;
    this._backgroundIsSelected = false;
    this._textIsSelected = true;
  }

  get textIsSelected(): boolean {
    return this._textIsSelected;
  }
}

export { SidebarTagsFieldsComponent, TagFieldsResponse }
