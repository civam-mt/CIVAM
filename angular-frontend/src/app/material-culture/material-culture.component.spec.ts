import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaterialCultureComponent } from './material-culture.component';

describe('MaterialCultureComponent', () => {
  let component: MaterialCultureComponent;
  let fixture: ComponentFixture<MaterialCultureComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialCultureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialCultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
