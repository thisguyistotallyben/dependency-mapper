import { Component, Input, OnInit } from '@angular/core';
import { DataService, Dependency, Ticket } from 'src/app/data.service';
import { TreeService } from 'src/app/tree/tree.service';

@Component({
  selector: 'app-sidebar-tickets-dependencies',
  templateUrl: './sidebar-tickets-dependencies.component.html',
  styleUrls: ['./sidebar-tickets-dependencies.component.scss']
})
export class SidebarTicketsDependenciesComponent implements OnInit {
  @Input() ticketId: string;

  ticket: Ticket;

  // state shenanigans
  selectingParentDependencies = false;
  parentDependencies = new Set<string>();
  selectingChildDependencies = false;
  childDependencies = new Set<string>();

  constructor(
    public dataService: DataService,
    private treeService: TreeService
  ) { }

  ngOnInit(): void { }

  selectParentDependencies(): void {
    this.selectingParentDependencies = true;
  }

  deleteDependency(dep: Dependency): void {
    this.dataService.removeDependency(dep.parentId, dep.childId);
    this.treeService.renderTree();
  }

  getTicketTitle(id: string): string {
    const ticket = this.dataService.getTicket(id);
    return ticket.title;
  }

  getTicketsForDependencies(): Array<Ticket> {
    return this.dataService.tickets.filter((ticket) => ticket.id != this.ticketId);
  }

  toggleSettingParentDependencies(): void {
    // set the checked states
    if (!this.selectingParentDependencies) {
      this.parentDependencies = new Set<string>(this.dataService.getParentDependencies(this.ticketId).map((dep) => dep.parentId));
    }

    this.selectingParentDependencies = !this.selectingParentDependencies;
  }

  toggleParentDependency(id: string): void {
    if (this.parentDependencies.has(id)) {
      this.parentDependencies.delete(id);
    } else {
      this.parentDependencies.add(id);
    }

    this.dataService.resetParentDependencies(this.ticketId, Array.from(this.parentDependencies))
    this.treeService.renderTree();
  }

  toggleSettingChildDependencies(): void {
    // set the checked states
    if (!this.selectingChildDependencies) {
      this.childDependencies = new Set<string>(this.dataService.getChildDependencies(this.ticketId).map((dep) => dep.childId));
    }

    this.selectingChildDependencies = !this.selectingChildDependencies;
  }

  toggleChildDependency(id: string): void {
    if (this.childDependencies.has(id)) {
      this.childDependencies.delete(id);
    } else {
      this.childDependencies.add(id);
    }

    this.dataService.resetChildDependencies(this.ticketId, Array.from(this.childDependencies))
    this.treeService.renderTree();
  }

}
