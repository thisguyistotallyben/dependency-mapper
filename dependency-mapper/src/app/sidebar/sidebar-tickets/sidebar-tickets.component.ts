import { ConfigService } from './../../config.service';
import { TreeService } from 'src/app/tree/tree.service';
import { DataService, Ticket } from 'src/app/data.service';
import { Component, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-sidebar-tickets',
  templateUrl: './sidebar-tickets.component.html',
  styleUrls: ['./sidebar-tickets.component.scss']
})
export class SidebarTicketsComponent implements OnInit {
  // state shenanigans
  makingNewTicket = false;

  constructor(
    private clipboard: Clipboard,
    private configService: ConfigService,
    private dataService: DataService,
    private treeService: TreeService
  ) { }

  ngOnInit(): void {
  }

  get tickets(): Array<Ticket> {
    return this.dataService.tickets.sort((a, b) => (a.title > b.title) ? 1 : -1)
  }

  toggleNewTicket(): void {
    this.makingNewTicket = !this.makingNewTicket;
  }

  newTicketIsOpen(): boolean {
    return this.makingNewTicket;
  }

  cancelNewTicket(): void {
    this.makingNewTicket = false;
  }

  addNewTicket(event: Ticket): void {
    this.dataService.addTicket(event);
    this.makingNewTicket = false;
    this.treeService.renderTree();
  }

  // TODO: Figure out how to adjust the url automatically
  // REASONING: I want this to be a 'save' where it just automatically updates the url
  copyUrl(): void {
    const data = this.dataService.export();
    const tags = undefined;
    const urlParam = encodeURIComponent(this.configService.encodeData(data, tags));

    // this.clipboard.copy('http://thisguyistotallyben.github.io/dependency-mapper/?data=' + urlParam);
    this.clipboard.copy('http://localhost:4200/?data=' + urlParam);
  }

}
