import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tag } from 'src/app/data.service';

@Component({
  selector: 'app-tag-item-details',
  templateUrl: './tag-item-details.component.html',
  styleUrls: ['./tag-item-details.component.scss']
})
export class TagItemDetailsComponent implements OnInit {
  @Input() tag: Tag;
  @Output() save = new EventEmitter<Tag>();
  @Output() cancel = new EventEmitter<void>();

  editTag: Tag;

  currentTab = 'background';
  tabs = [
    {label: 'Background', id: 'background'},
    {label: 'Border', id: 'border'},
    {label: 'Text', id: 'text'},
  ]

  constructor() { }

  ngOnInit(): void {
    if (this.tag) {
      this.editTag = {...this.tag};
    } else {
      this.editTag = new Tag();
      this.editTag.id = '';
      this.editTag.value = '';
      this.editTag.bgColor = '#ffffff';
      this.editTag.borderColor = '#000000';
      this.editTag.textColor = '#000000';
    }
  }

  handleSave(): void {
    console.log('saving', this.editTag);
    this.save.emit(this.editTag);
  }

  handleCancel(): void {
    console.log('cancelling');
    this.cancel.emit();
  }


  handleTabChange(tabId: string) {
    this.currentTab = tabId;
  }

  get modalTitle(): string {
    return this.tag
      ? this.tagName
      : 'New Tag';
  }

  get tagName(): string {
    return this.editTag.value;
  }
  
  set tagName(name: string) {
    this.editTag.value = name;
  }

  get currentColorField(): string {
    switch(this.currentTab) {
      case 'background': return this.editTag.bgColor;
      case 'border': return this.editTag.borderColor;
      case 'text': return this.editTag.textColor;
    }
  }

  set currentColorField(value: string) {
    switch(this.currentTab) {
      case 'background':
        this.editTag.bgColor = value;
        break;
      case 'border':
        this.editTag.borderColor = value;
        break;
      case 'text':
        this.editTag.textColor = value;
        break;
    }
  }
}
