import { TestBed } from '@angular/core/testing';

import { RegistrierenService } from './registrieren.service';

describe('RegistrierenService', () => {
  let service: RegistrierenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrierenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
