import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KeywordPageComponent } from './keyword-page.component';

describe('KeywordPageComponent', () => {
  let component: KeywordPageComponent;
  let fixture: ComponentFixture<KeywordPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KeywordPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
