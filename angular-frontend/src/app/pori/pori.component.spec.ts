import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PoriComponent } from './pori.component';

describe('PoriComponent', () => {
  let component: PoriComponent;
  let fixture: ComponentFixture<PoriComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PoriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
