import { TestBed } from '@angular/core/testing';

import { SiteTextSupportService } from './site-text-support.service';

describe('SiteTextSupportService', () => {
  let service: SiteTextSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteTextSupportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
