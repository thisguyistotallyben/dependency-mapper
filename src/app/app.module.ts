import { ClipboardModule } from '@angular/cdk/clipboard';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TreeComponent } from './tree/tree.component';
import { FormsModule } from '@angular/forms';
import { JiraComponent } from './jira/jira.component';
import { Routes, RouterModule } from '@angular/router';
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
    JiraComponent,
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
