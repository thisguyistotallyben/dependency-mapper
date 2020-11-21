import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTagsEntryComponent } from './sidebar-tags-entry.component';

describe('SidebarTagsEntryComponent', () => {
  let component: SidebarTagsEntryComponent;
  let fixture: ComponentFixture<SidebarTagsEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarTagsEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarTagsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
