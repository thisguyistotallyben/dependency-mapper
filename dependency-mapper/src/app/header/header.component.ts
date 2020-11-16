import { DataService } from 'src/app/data.service';
import { TreeService } from 'src/app/tree/tree.service';
import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showJiraModal = false;

  constructor(
    private clipboard: Clipboard,
    private treeService: TreeService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  closeModalAndRefresh(): void {
    this.showJiraModal = false;
    this.treeService.renderTree();
  }

  exportData(): void {
    const encodedData = this.dataService.exportURL();
    console.log(encodedData);
    this.dataService.importURL(encodedData);
  }

  copyToClipboard(): void {
    this.clipboard.copy('http://thisguyistotallyben.github.io/dependency-mapper/?data=' + this.dataService.exportURL());
    // this.clipboard.copy('http://localhost:4200/?data=' + this.dataService.exportURL());
  }

}
