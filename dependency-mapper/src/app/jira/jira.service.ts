import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './../config.service';
import { Ticket } from 'src/app/data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JiraService {
  baseUrlCookie = 'jira-base-url';
  projectCookie = 'jira-project';

  serverInfoPath = '/3/serverInfo';
  fieldInfoPath = '/3/field';
  projectInfoPath = '/3/project';
  obs: Observable<any>;

  // state shenanigans
  baseUrl: string;
  project: string;

  constructor(
    private configService: ConfigService,
    private http: HttpClient
  ) {
    this.baseUrl = this.configService.getCookie(this.baseUrlCookie);
    this.project = this.configService.getCookie(this.projectCookie);
  }

  setBaseUrl(url: string): void {
    this.configService.setCookie(this.baseUrlCookie, url)
    this.baseUrl = url;
  }

  setProject(project: string): void {
    this.configService.setCookie(this.projectCookie, project)
    this.project = project;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getProject(): string {
    return this.project;
  }

  getFields(): void {
    // this will use the API call to get all the fields in Jira so one can select by name rather than
    //   weird custom field names
    // basically, just do a .filter on the array to get whatever is needed
    // https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/#api-rest-api-3-field-get
  }

  getProjects(): void {
    // this will get the projects (COMM, NIQ, etc.) for narrowing down epics or whatever
    // https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-projects/#api-rest-api-3-project-get
  }

  getIssue(id: string): Ticket {
    // this will use the API call to get a ticket and dump the raw data into Ticket.
    //   - Pull currnt project in from default project
    // I'm thinking I might need some sort of config to say which fields are wanted, but we'll see about that
    // https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-issueidorkey-get
    return undefined;
  }


}
