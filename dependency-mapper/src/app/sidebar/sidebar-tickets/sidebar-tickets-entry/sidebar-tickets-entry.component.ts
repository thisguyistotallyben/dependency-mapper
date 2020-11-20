import { TreeService } from 'src/app/tree/tree.service';
import { Ticket, DataService } from 'src/app/data.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-tickets-entry',
  templateUrl: './sidebar-tickets-entry.component.html',
  styleUrls: ['./sidebar-tickets-entry.component.scss']
})
export class SidebarTicketsEntryComponent implements OnInit {
  @Input()
  ticket: Ticket;

  editingTicket = false;
  settingDependencies = false;
  deletingTicket = false;

  constructor(
    private dataService: DataService,
    private treeService: TreeService
  ) { }

  ngOnInit(): void {
  }

  get title(): string {
    return this.ticket.title;
  }

  /* state setting/checking */

  toggleDependencies(): void {
    this.settingDependencies = !this.settingDependencies;
    if (this.settingDependencies) {
      this.editingTicket = false;
      this.deletingTicket = false;
    }
  }

  isSettingDependencies(): boolean {
    return this.settingDependencies;
  }

  toggleEdit(): void {
    this.editingTicket = !this.editingTicket;
    if (this.editingTicket) {
      this.settingDependencies = false;
      this.deletingTicket = false;
    }
  }

  isEditing(): boolean {
    return this.editingTicket;
  }

  toggleDelete(): void {
    this.deletingTicket = !this.deletingTicket;
    if (this.deletingTicket) {
      this.settingDependencies = false;
      this.editingTicket = false;
    }
  }

  isDeleting(): boolean {
    return this.deletingTicket;
  }

  delete(): void {
    this.dataService.removeTicket(this.ticket.id);
    this.treeService.renderTree();
  }

  isEntryOpen(): boolean {
    return this.settingDependencies || this.editingTicket || this.deletingTicket;
  }

  update(event: Ticket): void {
    this.dataService.addTicket(event);
    this.treeService.renderTree();
  }

}
