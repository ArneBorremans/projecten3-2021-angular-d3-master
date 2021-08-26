import { TestBed } from '@angular/core/testing';

import { LoperDataService } from './loper-data.service';

describe('LoperDataService', () => {
  let service: LoperDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoperDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
