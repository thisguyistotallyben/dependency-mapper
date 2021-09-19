import { JiraService } from './jira/jira.service';
import { ConfigService } from './config.service';
import { TreeService } from 'src/app/tree/tree.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from './firebase.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private dataService: DataService, private firebaseService: FirebaseService) { }
}
