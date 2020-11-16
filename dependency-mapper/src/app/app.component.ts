import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config.service';
import { JiraService } from './jira/jira.service';
import { DataService } from './data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'dependency-mapper';

  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService,
    private dataService: DataService,
    private jiraService: JiraService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe( params => {
      if (params.data) {
        this.dataService.importURL(params.data);
      }
  });
  }
}
