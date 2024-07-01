import { TestBed } from '@angular/core/testing';

import { ChordFetcherService } from './chord-fetcher.service';

describe('ChordFetcherService', () => {
  let service: ChordFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChordFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
