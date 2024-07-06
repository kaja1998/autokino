import { TestBed } from '@angular/core/testing';

import { TicketCounterService } from './ticket-counter.service';

describe('TicketCounterService', () => {
  let service: TicketCounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketCounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
