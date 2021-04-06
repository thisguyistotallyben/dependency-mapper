// DEPRECATED?

import { JiraService } from './jira.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-jira',
  templateUrl: './jira.component.html',
  styleUrls: ['./jira.component.scss']
})
export class JiraComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  // state shenanigans
  baseUrl: string;
  project: string;

  constructor(private jiraService: JiraService) { }

  ngOnInit(): void {
    console.log('yee haw');
    this.baseUrl = this.jiraService.getBaseUrl();
    this.project = this.jiraService.getProject();
  }

  closeJiraModal(): void {
    this.close.emit();
  }

  saveAndClose(): void {
    this.jiraService.setBaseUrl(this.baseUrl);
    this.jiraService.setProject(this.project);

    this.closeJiraModal();
  }

}
