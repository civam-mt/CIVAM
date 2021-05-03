import { TestBed } from '@angular/core/testing';

import { MapSupportService } from './map-support.service';

describe('MapSupportService', () => {
  let service: MapSupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapSupportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
