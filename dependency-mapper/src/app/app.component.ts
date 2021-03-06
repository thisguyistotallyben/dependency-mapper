import { JiraService } from './jira/jira.service';
import { ConfigService } from './config.service';
import { TreeService } from 'src/app/tree/tree.service';
import { Component, OnInit } from '@angular/core';
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
    private treeService: TreeService
  ) { }

  ngOnInit() {
    // Possible info on how this stuff even works
    // https://stackoverflow.com/questions/44864303/send-data-through-routing-paths-in-angular/44865817#44865817
    this.route.queryParams.subscribe( params => {
      if (params.data) {
        const data = this.configService.decodeData(params.data);
        this.dataService.import(data);
        this.treeService.loadTagStyles(data);
        this.treeService.renderTree();
      }
  });
  }
}
