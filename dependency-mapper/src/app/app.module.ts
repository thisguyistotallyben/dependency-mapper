import { ClipboardModule } from '@angular/cdk/clipboard';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TreeComponent } from './tree/tree.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { SidebarDependenciesComponent } from './sidebar/sidebar-dependencies/sidebar-dependencies.component';
import { JiraComponent } from './jira/jira.component';
import { Routes, RouterModule } from '@angular/router';
import { SidebarTicketsComponent } from './sidebar/sidebar-tickets/sidebar-tickets.component';
import { SidebarTicketsFieldsComponent } from './sidebar/sidebar-tickets/sidebar-tickets-fields/sidebar-tickets-fields.component';
import { SidebarTicketsEntryComponent } from './sidebar/sidebar-tickets/sidebar-tickets-entry/sidebar-tickets-entry.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'data/:stonks',
    component: TreeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TreeComponent,
    SidebarComponent,
    SidebarDependenciesComponent,
    JiraComponent,
    SidebarTicketsComponent,
    SidebarTicketsFieldsComponent,
    SidebarTicketsEntryComponent,
  ],
  imports: [
    BrowserModule,
    ClipboardModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
