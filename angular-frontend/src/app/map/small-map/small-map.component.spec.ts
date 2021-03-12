import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SmallMapComponent } from './small-map.component';

describe('SmallMapComponent', () => {
  let component: SmallMapComponent;
  let fixture: ComponentFixture<SmallMapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
