import { TestBed } from '@angular/core/testing';

import { UserCredService } from './user-cred.service';

describe('UserCredService', () => {
  let service: UserCredService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCredService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
