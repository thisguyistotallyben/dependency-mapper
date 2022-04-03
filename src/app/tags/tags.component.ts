import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit();
  }

  deleteTag(tagId: string) {
    this.dataService.removeTag(tagId);
  }

  get tags() {
    return this.dataService.tags;
  }
}
