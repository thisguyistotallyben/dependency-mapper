import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService, Tag } from 'src/app/data.service';

@Component({
  selector: 'app-tag-item',
  templateUrl: './tag-item.component.html',
  styleUrls: ['./tag-item.component.scss']
})
export class TagItemComponent implements OnInit {
  @Input() tag: Tag;
  @Output() delete = new EventEmitter<string>();

  isEditing = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void { }

  editTag() {
    this.isEditing = true;
  }

  deleteTag() {
    this.delete.emit(this.tag.id);
  }

  handleDetailsCancel(): void {
    this.isEditing = false;
  }
  
  handleDetailsSave(tag: Tag): void {
    this.dataService.addTag(tag);
    this.isEditing = false;
  }

  handleButtonClick() {
    if (!this.tag) {
      this.editTag();
    }
  }

  get bgColor(): string {
    return this.tag?.bgColor;
  }

  get borderColor(): string {
    return this.tag?.borderColor;
  }

  get textColor(): string {
    return this.tag?.textColor;
  }
}
