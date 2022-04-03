import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/*

  tabs: Array of {label, id}

*/
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() tabs: Array<any>;
  @Output() tabChange = new EventEmitter<string>();

  currentTab;

  constructor() { }

  ngOnInit(): void {
    if (this.tabs) {
      this.currentTab = this.tabs[0].id;
    }
  }

  handleTabChange(id: string) {
    this.currentTab = id;
    this.tabChange.emit(id);
  }

}
