import { TestBed } from '@angular/core/testing';

import { FlmonthlyService } from './flmonthly.service';

describe('FlmonthlyService', () => {
  let service: FlmonthlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlmonthlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
