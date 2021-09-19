import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { DataService, Tag } from 'src/app/data.service';

@Component({
  selector: 'app-topbar-tags',
  templateUrl: './topbar-tags.component.html',
  styleUrls: ['./topbar-tags.component.scss']
})
export class TopbarTagsComponent implements OnInit {
  @Output()
  close = new EventEmitter<void>();

  currentTag: Tag;

  newTagName = '';

  // state stuff
  backgroundIsSelected = true;
  borderIsSelected = false;
  textIsSelected = false;

  value;
  bgColor;
  borderColor;
  borderWidth;
  borderStyle;
  textColor;

  selectText() {
    this.backgroundIsSelected = false;
    this.borderIsSelected = false;
    this.textIsSelected = true;
  }
  selectBorder() {
    this.backgroundIsSelected = false;
    this.borderIsSelected = true;
    this.textIsSelected = false;
  }
  selectBackground() {
    this.backgroundIsSelected = true;
    this.borderIsSelected = false;
    this.textIsSelected = false;
  }

  doThing() {
    console.log('did the thing');
  }
  // end visual settings dump

  constructor(private changeDetector: ChangeDetectorRef, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.tagObserver.subscribe(
      x => this.changeDetector.detectChanges(),
      err => console.error('oopsie poopsie', err),
      () => console.warn('tag observer for tags finished')
    );
  }

  handleAddNewTag() {
    console.log('do the things', this.newTagName);
    this.dataService.addTag(new Tag(this.newTagName));
    this.newTagName = '';
  }

  handleTagSelect(id: string) {
    console.log('id', id);
    this.currentTag = this.dataService.getTag(id);

    this.value = this.currentTag.value || '';
    this.bgColor = this.currentTag.bgColor || '';
    this.borderColor = this.currentTag.borderColor;
    this.borderWidth = this.currentTag.borderWidth;
    this.borderStyle = this.currentTag.borderStyle;
    this.textColor = this.currentTag.textColor;
  }

  handleClose() {
    this.close.emit();
  }

  // value changes shenanigans

  updateTag(property: string) {
    // a little shenanigan here:
    //   For this to work, the names of the properties on
    //   both the object and this class have to match.
    this.currentTag[property] = this[property];
    this.dataService.addTag(this.currentTag);
  }

  get tags() {
    return this.dataService.tags;
  }

  get tagIsSelected(): boolean {
    return !!this.currentTag;
  }

  tagItemIsSelected(id: string): boolean {
    return this.currentTag && this.currentTag.id === id;
  }
}
