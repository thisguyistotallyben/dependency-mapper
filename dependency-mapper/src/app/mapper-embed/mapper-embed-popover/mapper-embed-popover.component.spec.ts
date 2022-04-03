import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapperEmbedPopoverComponent } from './mapper-embed-popover.component';

describe('MapperEmbedPopoverComponent', () => {
  let component: MapperEmbedPopoverComponent;
  let fixture: ComponentFixture<MapperEmbedPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapperEmbedPopoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapperEmbedPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
