import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoriComponent } from './pori.component';

describe('PoriComponent', () => {
  let component: PoriComponent;
  let fixture: ComponentFixture<PoriComponent>;

  beforeEach(async(() => {
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
