import { ClipboardModule } from '@angular/cdk/clipboard';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TreeComponent } from './tree/tree.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ColorPickerModule } from 'ngx-color-picker';
import { TreeEditComponent } from './tree/tree-edit/tree-edit.component';
import { TopbarComponent } from './topbar/topbar.component';
import { MapperComponent } from './mapper/mapper.component';
import { SplashComponent } from './splash/splash.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketDeleteComponent } from './ticket/ticket-delete/ticket-delete.component';
import { GroupComponent } from './group/group.component';
import { TagsComponent } from './tags/tags.component';
import { ModalComponent } from './ui-components/modal/modal.component';
import { TagItemComponent } from './tags/tag-item/tag-item.component';
import { TagItemDetailsComponent } from './tags/tag-item-details/tag-item-details.component';
import { TabsComponent } from './ui-components/tabs/tabs.component';
import { TreeEditPopoverComponent } from './tree/tree-edit/tree-edit-popover/tree-edit-popover.component';
import { MapperEmbedComponent } from './mapper-embed/mapper-embed.component';
import { MapperEmbedHeaderComponent } from './mapper-embed/mapper-embed-header/mapper-embed-header.component';
import { MapperEmbedPopoverComponent } from './mapper-embed/mapper-embed-popover/mapper-embed-popover.component';

const routes: Routes = [
  {
    path: ':mapId/embed',
    component: MapperEmbedComponent
  },
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
    TreeEditComponent,
    TopbarComponent,
    MapperComponent,
    SplashComponent,
    TicketComponent,
    TicketDeleteComponent,
    GroupComponent,
    TagsComponent,
    ModalComponent,
    TagItemComponent,
    TagItemDetailsComponent,
    TabsComponent,
    TreeEditPopoverComponent,
    MapperEmbedComponent,
    MapperEmbedHeaderComponent,
    MapperEmbedPopoverComponent,
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
