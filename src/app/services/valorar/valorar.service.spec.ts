import { TestBed } from '@angular/core/testing';

import { ValorarService } from './valorar.service';

describe('ValorarService', () => {
  let service: ValorarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValorarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
