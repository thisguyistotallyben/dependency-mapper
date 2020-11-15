import { JiraService } from './jira.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-jira',
  templateUrl: './jira.component.html',
  styleUrls: ['./jira.component.scss']
})
export class JiraComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  constructor(jiraService: JiraService) { }

  ngOnInit(): void {
  }

  closeJiraModal(): void {
    console.log('help yo');
    this.close.emit();
  }

}
