import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketCounterService {
  private ticketCounterSource = new BehaviorSubject<number>(0);
  ticketCounter$ = this.ticketCounterSource.asObservable();

  updateTicketCounter(counter: number) {
    this.ticketCounterSource.next(counter);
  }
}
