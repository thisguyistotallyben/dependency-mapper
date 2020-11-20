import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTicketsFieldsComponent } from './sidebar-tickets-fields.component';

describe('SidebarTicketsFieldsComponent', () => {
  let component: SidebarTicketsFieldsComponent;
  let fixture: ComponentFixture<SidebarTicketsFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarTicketsFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarTicketsFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
