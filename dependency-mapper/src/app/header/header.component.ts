import { TreeService } from 'src/app/tree/tree.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showJiraModal = false;

  constructor(private treeService: TreeService) { }

  ngOnInit(): void {
  }

  closeModalAndRefresh(): void {
    this.showJiraModal = false;
    this.treeService.renderTree();
  }

}
