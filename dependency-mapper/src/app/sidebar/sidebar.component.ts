import { ConfigService } from './../config.service';
import { TreeService } from 'src/app/tree/tree.service';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../data.service';
import { Clipboard } from '@angular/cdk/clipboard';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild("titleField") titleField: ElementRef;

  // state shenanigans
  toastIsDisplayed = false;
  displayedMenu = 'tickets';
  // displayedMenu = 'tags';
  isHidden = false;
  _title: string;
  _isEditingTitle: boolean;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private configService: ConfigService,
    public dataService: DataService,
    private treeService: TreeService,
    private clipboard: Clipboard) { }

  ngOnInit(): void {
    this._title = this.dataService.getTitle();
  }

  get title(): string {
    this._title = this.dataService.getTitle();
    return this._title;
  }

  set title(title: string) {
    this.dataService.setTitle(title);
    this._title = title;
  }

  selectTickets(): void {
    this.displayedMenu = 'tickets';
  }

  isDisplayingTickets(): boolean {
    return this.displayedMenu == 'tickets';
  }

  selectTags() {
    this.displayedMenu = 'tags';
  }

  isDisplayingTags(): boolean {
    return this.displayedMenu == 'tags';
  }

  selectSettings() {
    this.displayedMenu = 'settings';
  }

  isDisplayingSettings(): boolean {
    return this.displayedMenu == 'settings';
  }

  toggleSidebar(): void {
    this.isHidden = !this.isHidden;
  }

  sidebarIsHidden(): boolean {
    return this.isHidden;
  }

  editTitle(): void {
    if (!this.dataService.getTitle()) {
      this._title = '';
    }
    this._isEditingTitle = true;

    this.changeDetector.detectChanges();
    this.titleField.nativeElement.focus();
  }

  stopEditingTicket(): void {
    this._isEditingTitle = false;
  }

  isEditingTitle(): boolean {
    return this._isEditingTitle;
  }

  // TODO: Move this to a service
  copyLinkToClipboard(): void {
    const data = {
      ...this.dataService.export(),
      ...this.treeService.export()
    };
    const urlParam = encodeURIComponent(this.configService.encodeData(data));

    this.clipboard.copy('http://thisguyistotallyben.github.io/dependency-mapper/?data=' + urlParam);
    // this.clipboard.copy('http://localhost:4200/?data=' + urlParam);

    this.toastIsDisplayed = true;
    const that = this;
    setTimeout(function() { that.toastIsDisplayed = false; }, 2000);
  }

}
