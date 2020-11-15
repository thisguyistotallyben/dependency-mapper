import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './../config.service';
import { Ticket } from 'src/app/data.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JiraService {
  serverInfoPath = '/3/serverInfo';
  fieldInfoPath = '/3/field';
  projectInfoPath = '/3/project';
  obs: Observable<any>;

  constructor(
    private configService: ConfigService,
    private http: HttpClient
  ) {
    console.log('Initializing Jira Service');
    // let headers = new HttpHeaders();
    // this.getFields();
    // this.getProjects();

    const projectsUrl = `${this.configService.getRawConfig()['base-url']}/rest/api${this.serverInfoPath}`;
    const jiraApiKey = this.configService.getRawConfig()['jira-api-key'];

    /*
     ... has been blocked by CORS policy: Response to preflight request doesn't
     pass access control check: No 'Access-Control-Allow-Origin' header is
     present on the requested resource.
    */

    // this.http.get<any>(
    //   projectsUrl,
    //   {
    //     headers: {
    //       Authorization: 'Basic ' + btoa(`email:${jiraApiKey}`),
    //       Accept: 'application/json'
    //     },
    //     observe: 'response'
    //   }
    // ).subscribe(resp => {
    //   console.log(resp);
    // });
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
