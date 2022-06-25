import { TestBed } from '@angular/core/testing';

import { IntercambiarService } from './intercambiar.service';

describe('IntercambiarService', () => {
  let service: IntercambiarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntercambiarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
