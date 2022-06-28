import { TestBed } from '@angular/core/testing';

import { SsesionService } from './ssesion.service';

describe('SsesionService', () => {
  let service: SsesionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SsesionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
