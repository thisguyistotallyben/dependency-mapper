import { TreeService } from 'src/app/tree/tree.service';
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

  constructor(
    private jiraService: JiraService,
    private treeService: TreeService) { }

  ngOnInit(): void {
    this.jiraBaseUrl = this.jiraService.getBaseUrl();
    this.jiraProject = this.jiraService.getProject();
  }

  setBaseUrl() {
    this.jiraService.setBaseUrl(this.jiraBaseUrl);
  }

  setProject() {
    this.jiraService.setProject(this.jiraProject);
  }

  get jiraIsEnabled(): boolean {
    return this.jiraService.isEnabled;
  }

  toggleJira() {
    this.jiraService.isEnabled = !this.jiraService.isEnabled;
    this.treeService.renderTree();
  }
}
