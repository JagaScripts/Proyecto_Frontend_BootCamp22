import { TestBed } from '@angular/core/testing';

import { PrestacionService } from './prestacion.service';

describe('PrestacionService', () => {
  let service: PrestacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
