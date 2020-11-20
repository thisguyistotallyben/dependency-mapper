import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTicketsDependenciesComponent } from './sidebar-tickets-dependencies.component';

describe('SidebarTicketsDependenciesComponent', () => {
  let component: SidebarTicketsDependenciesComponent;
  let fixture: ComponentFixture<SidebarTicketsDependenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarTicketsDependenciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarTicketsDependenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
