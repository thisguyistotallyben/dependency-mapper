import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTicketsEntryComponent } from './sidebar-tickets-entry.component';

describe('SidebarTicketsEntryComponent', () => {
  let component: SidebarTicketsEntryComponent;
  let fixture: ComponentFixture<SidebarTicketsEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarTicketsEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarTicketsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
