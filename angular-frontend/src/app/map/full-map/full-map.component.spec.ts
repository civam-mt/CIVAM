import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullMapComponent } from './full-map.component';

describe('FullMapComponent', () => {
  let component: FullMapComponent;
  let fixture: ComponentFixture<FullMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
