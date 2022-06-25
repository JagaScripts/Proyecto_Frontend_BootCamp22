import { TestBed } from '@angular/core/testing';

import { PrestarService } from './prestar.service';

describe('PrestarService', () => {
  let service: PrestarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
