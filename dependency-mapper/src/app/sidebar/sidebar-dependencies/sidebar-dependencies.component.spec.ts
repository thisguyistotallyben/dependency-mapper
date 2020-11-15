import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDependenciesComponent } from './sidebar-dependencies.component';

describe('SidebarDependenciesComponent', () => {
  let component: SidebarDependenciesComponent;
  let fixture: ComponentFixture<SidebarDependenciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarDependenciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarDependenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
