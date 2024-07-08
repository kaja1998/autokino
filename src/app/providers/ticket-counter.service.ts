import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketCounterService {
  private ticketCounterSource = new BehaviorSubject<number>(0);
  private veranstaltungsNrSource = new BehaviorSubject<number>(0);
  ticketCounter$ = this.ticketCounterSource.asObservable();
  veranstaltungsNr$ = this.veranstaltungsNrSource.asObservable();

  updateTicketCounter(counter: number,v_nr:number) {
    this.ticketCounterSource.next(counter);
    this.veranstaltungsNrSource.next(v_nr);
  }
}
