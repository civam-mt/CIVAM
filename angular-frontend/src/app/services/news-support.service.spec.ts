import { TestBed } from '@angular/core/testing';

import { NewsSupportService } from './news-support.service';

describe('NewsSupportService', () => {
  let service: NewsSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsSupportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
