import { TestBed } from '@angular/core/testing';

import { IntercambioService } from './intercambio.service';

describe('IntercambioService', () => {
  let service: IntercambioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntercambioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
