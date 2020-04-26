import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureCollectionsComponent } from './picture-collections.component';

describe('PictureCollectionsComponent', () => {
  let component: PictureCollectionsComponent;
  let fixture: ComponentFixture<PictureCollectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureCollectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
