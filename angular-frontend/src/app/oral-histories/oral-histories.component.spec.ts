import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OralHistoriesComponent } from './oral-histories.component';

describe('OralHistoriesComponent', () => {
  let component: OralHistoriesComponent;
  let fixture: ComponentFixture<OralHistoriesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OralHistoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OralHistoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
