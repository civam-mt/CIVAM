import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCultureComponent } from './material-culture.component';

describe('MaterialCultureComponent', () => {
  let component: MaterialCultureComponent;
  let fixture: ComponentFixture<MaterialCultureComponent>;

  beforeEach(async(() => {
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
