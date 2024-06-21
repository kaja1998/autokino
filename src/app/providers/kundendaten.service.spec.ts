import { TestBed } from '@angular/core/testing';

import { KundendatenService } from './kundendaten.service';

describe('KundendatenService', () => {
  let service: KundendatenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KundendatenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
