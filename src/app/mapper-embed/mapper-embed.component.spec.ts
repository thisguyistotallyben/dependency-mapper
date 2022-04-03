import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapperEmbedComponent } from './mapper-embed.component';

describe('MapperEmbedComponent', () => {
  let component: MapperEmbedComponent;
  let fixture: ComponentFixture<MapperEmbedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapperEmbedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapperEmbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
