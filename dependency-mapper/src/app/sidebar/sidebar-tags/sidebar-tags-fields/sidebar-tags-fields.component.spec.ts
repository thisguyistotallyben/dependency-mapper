import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTagsFieldsComponent } from './sidebar-tags-fields.component';

describe('SidebarTagsFieldsComponent', () => {
  let component: SidebarTagsFieldsComponent;
  let fixture: ComponentFixture<SidebarTagsFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarTagsFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarTagsFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
