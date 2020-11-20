import { JiraService } from './../../jira/jira.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-settings',
  templateUrl: './sidebar-settings.component.html',
  styleUrls: ['./sidebar-settings.component.scss']
})
export class SidebarSettingsComponent implements OnInit {
  jiraBaseUrl: string;
  jiraProject: string;

  constructor(private jiraService: JiraService) { }

  ngOnInit(): void {
    this.jiraBaseUrl = this.jiraService.getBaseUrl();
    this.jiraProject = this.jiraService.getProject();
  }

  setProject() {
    this.jiraService.setProject(this.jiraProject);
  }

}
