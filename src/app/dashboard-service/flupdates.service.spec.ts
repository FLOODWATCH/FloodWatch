import { TestBed } from '@angular/core/testing';

import { FlupdatesService } from './flupdates.service';

describe('FlupdatesService', () => {
  let service: FlupdatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlupdatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
