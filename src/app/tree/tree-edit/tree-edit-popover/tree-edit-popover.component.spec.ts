import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeEditPopoverComponent } from './tree-edit-popover.component';

describe('TreeEditPopoverComponent', () => {
  let component: TreeEditPopoverComponent;
  let fixture: ComponentFixture<TreeEditPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeEditPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeEditPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
