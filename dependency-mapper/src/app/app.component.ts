import { Component } from '@angular/core';
import { ConfigService } from './config.service';
import { JiraService } from './jira/jira.service';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dependency-mapper';

  constructor(
    private configService: ConfigService,
    private dataService: DataService,
    private jiraService: JiraService
  ) { }
}
