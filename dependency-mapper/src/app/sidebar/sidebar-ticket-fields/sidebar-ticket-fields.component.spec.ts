import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTicketFieldsComponent } from './sidebar-ticket-fields.component';

describe('SidebarTicketFieldsComponent', () => {
  let component: SidebarTicketFieldsComponent;
  let fixture: ComponentFixture<SidebarTicketFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarTicketFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarTicketFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
