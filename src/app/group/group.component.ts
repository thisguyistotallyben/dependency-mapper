import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService, Group } from '../data.service';
import { State, TreeEditService } from '../tree/tree-edit/tree-edit.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  @Output()
  close = new EventEmitter<void>();

  shouldShowModal = true;

  currentGroup: Group;

  // state stuff
  newGroupName = '';
  editGroupName = '';

  constructor(
    private dataService: DataService,
    private treeEditService: TreeEditService) { }

  ngOnInit(): void {
  }

  handleClose() {
    this.close.emit();
  }

  handleAddNewGroup() {
    const group = new Group();
    group.value = this.newGroupName;
    this.dataService.addGroup(group);
    this.newGroupName = '';
  }

  handleGroupSelect(id: string) {
    this.currentGroup = this.dataService.getGroup(id);

    this.editGroupName = this.currentGroup.value;
  }

  updateName() {
    this.currentGroup.value = this.editGroupName;
    this.dataService.addGroup(this.currentGroup);
  }

  updateTag(selectedTagId: string) {
    this.currentGroup.tagId = selectedTagId;
    this.dataService.addGroup(this.currentGroup);
  }

  deleteticket() {
    this.dataService.removeGroup(this.currentGroup.id);
    this.currentGroup = undefined;
  }

  setTickets() {
    this.treeEditService.preAddedSelections = this.dataService.getGroupTickets(this.currentGroup.id)
      .map(ticket => ticket.id);

    this.handleClose();
    this.treeEditService.currentNodeId = this.currentGroup.id;
    this.treeEditService.state = State.EditGroup;

    this.dataService.genericObserver.next();
  }

  groupItemIsSelected(id: string) {
    return this.currentGroup && this.currentGroup.id === id;
  }

  get groupIsSelected(): boolean {
    return !!this.currentGroup;
  }

  get groups() {
    return this.dataService.groups;
  }

  get tags() {
    return [{id: '', value: '--None--'}].concat(this.dataService.tags);
  }
}
