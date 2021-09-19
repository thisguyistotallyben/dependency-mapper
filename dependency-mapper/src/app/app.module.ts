import { ClipboardModule } from '@angular/cdk/clipboard';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TreeComponent } from './tree/tree.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { JiraComponent } from './jira/jira.component';
import { Routes, RouterModule } from '@angular/router';
import { SidebarTicketsComponent } from './sidebar/sidebar-tickets/sidebar-tickets.component';
import { SidebarTicketsFieldsComponent } from './sidebar/sidebar-tickets/sidebar-tickets-fields/sidebar-tickets-fields.component';
import { SidebarTicketsEntryComponent } from './sidebar/sidebar-tickets/sidebar-tickets-entry/sidebar-tickets-entry.component';
import { SidebarSettingsComponent } from './sidebar/sidebar-settings/sidebar-settings.component';
import { SidebarTicketsDependenciesComponent } from './sidebar/sidebar-tickets/sidebar-tickets-dependencies/sidebar-tickets-dependencies.component';
import { SidebarTagsComponent } from './sidebar/sidebar-tags/sidebar-tags.component';
import { SidebarTagsEntryComponent } from './sidebar/sidebar-tags/sidebar-tags-entry/sidebar-tags-entry.component';
import { SidebarTagsFieldsComponent } from './sidebar/sidebar-tags/sidebar-tags-fields/sidebar-tags-fields.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { TreeEditComponent } from './tree/tree-edit/tree-edit.component';
import { TopbarComponent } from './topbar/topbar.component';
import { MapperComponent } from './mapper/mapper.component';
import { SplashComponent } from './splash/splash.component';
import { TopbarTagsComponent } from './topbar/topbar-tags/topbar-tags.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketDeleteComponent } from './ticket/ticket-delete/ticket-delete.component';

const routes: Routes = [
  {
    path: ':mapId',
    component: MapperComponent
  },
  {
    path: '',
    component: SplashComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    SidebarComponent,
    JiraComponent,
    SidebarTicketsComponent,
    SidebarTicketsFieldsComponent,
    SidebarTicketsEntryComponent,
    SidebarSettingsComponent,
    SidebarTicketsDependenciesComponent,
    SidebarTagsComponent,
    SidebarTagsEntryComponent,
    SidebarTagsFieldsComponent,
    TreeEditComponent,
    TopbarComponent,
    MapperComponent,
    SplashComponent,
    TopbarTagsComponent,
    TicketComponent,
    TicketDeleteComponent,
  ],
  imports: [
    BrowserModule,
    ClipboardModule,
    ColorPickerModule,
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
