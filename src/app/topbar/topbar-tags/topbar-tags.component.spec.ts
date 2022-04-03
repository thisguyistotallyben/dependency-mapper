import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarTagsComponent } from './topbar-tags.component';

describe('TopbarTagsComponent', () => {
  let component: TopbarTagsComponent;
  let fixture: ComponentFixture<TopbarTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopbarTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
