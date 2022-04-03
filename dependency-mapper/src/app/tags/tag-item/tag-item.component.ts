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

  tagToEdit: Tag;

  // edit state shenanigans
  isEditing = false;
  editName: string;
  editBgColor: string;
  editBorderColor: string;
  editTextColor: string;

  currentTab = 'background';
  tabs = [
    {label: 'Background', id: 'background'},
    {label: 'Border', id: 'border'},
    {label: 'Text', id: 'text'},
  ]

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    if (!this.tag) {
      this.tagToEdit = new Tag();
    }
    this.resetTagToEdit();
  }

  editTag() {
    this.isEditing = true;
  }

  deleteTag() {
    this.delete.emit(this.tag.id);
  }

  handleButtonClick() {
    if (!this.tag) {
      this.editTag();
    }
  }

  handleTabChange(tabId: string) {
    this.currentTab = tabId;
  }

  cancelEdit() {
    this.resetTagToEdit();
    this.isEditing = false;
  }

  endEdit() {
    this.dataService.addTag(this.tagToEdit);
    this.resetTagToEdit();

    this.isEditing = false;
  }

  resetTagToEdit() {
    if (this.tag) {
      this.tagToEdit = { ...this.tag };
    } else {
      this.tagToEdit.id = '';
      this.tagToEdit.value = '';
      this.tagToEdit.bgColor = '#ffffff';
      this.tagToEdit.borderColor = '#000000';
      this.tagToEdit.textColor = '#000000';
    }
  }

  get modalTitle(): string {
    return this.tag
      ? 'Edit'
      : 'New';
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

  get currentColorField(): string {
    switch(this.currentTab) {
      case 'background': return this.tagToEdit.bgColor;
      case 'border': return this.tagToEdit.borderColor;
      case 'text': return this.tagToEdit.textColor;
    }
  }

  set currentColorField(value: string) {
    switch(this.currentTab) {
      case 'background':
        this.tagToEdit.bgColor = value;
        break;
      case 'border':
        this.tagToEdit.borderColor = value;
        break;
      case 'text':
        this.tagToEdit.textColor = value;
        break;
    }
  }
}
