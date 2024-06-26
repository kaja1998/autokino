import { TestBed } from '@angular/core/testing';

import { KartenkaufenService } from './kartenkaufen.service';

describe('KartenkaufenService', () => {
  let service: KartenkaufenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KartenkaufenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
