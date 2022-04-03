import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapperEmbedHeaderComponent } from './mapper-embed-header.component';

describe('MapperEmbedHeaderComponent', () => {
  let component: MapperEmbedHeaderComponent;
  let fixture: ComponentFixture<MapperEmbedHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapperEmbedHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapperEmbedHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
