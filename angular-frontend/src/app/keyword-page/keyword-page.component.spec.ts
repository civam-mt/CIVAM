import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordPageComponent } from './keyword-page.component';

describe('KeywordPageComponent', () => {
  let component: KeywordPageComponent;
  let fixture: ComponentFixture<KeywordPageComponent>;

  beforeEach(async(() => {
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
