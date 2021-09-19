import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService, Tag } from 'src/app/data.service';

@Component({
  selector: 'app-topbar-tags',
  templateUrl: './topbar-tags.component.html',
  styleUrls: ['./topbar-tags.component.scss']
})
export class TopbarTagsComponent implements OnInit {
  @Output()
  close = new EventEmitter<void>();

  newTagName = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  handleAddNewTag() {
    console.log('do the things', this.newTagName);
    this.dataService.addTag(new Tag(this.newTagName));
    this.newTagName = '';
  }

  handleTagSelect(id: string) {
    console.log('id', id);
  }

  handleClose() {
    this.close.emit();
  }

  get tags() {
    return this.dataService.tags;
  }

}
