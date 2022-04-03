import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagItemDetailsComponent } from './tag-item-details.component';

describe('TagItemDetailsComponent', () => {
  let component: TagItemDetailsComponent;
  let fixture: ComponentFixture<TagItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagItemDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
