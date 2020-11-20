import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTicketsComponent } from './sidebar-tickets.component';

describe('SidebarTicketsComponent', () => {
  let component: SidebarTicketsComponent;
  let fixture: ComponentFixture<SidebarTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
