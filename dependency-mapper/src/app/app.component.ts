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
    private dataService: DataService,
    private treeService: TreeService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe( params => {
      if (params.data) {
        this.dataService.importURL(params.data);
        this.treeService.renderTree();
      }
  });
  }
}
