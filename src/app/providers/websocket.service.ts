// my-socket.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketCounterService } from './ticket-counter.service';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket;

  constructor(private ticketCounterService: TicketCounterService) {
    this.socket = io('ws://localhost:8080/');

    this.socket.on('connection', () => {
      console.log(`connected with socket: ${this.socket.id}`);
    });

    this.socket.on('updateTicketCounter', (counter: number,v_nr:number) => {
      console.log(`send to all dev`, counter);
      this.ticketCounterService.updateTicketCounter(counter,v_nr);
    });
  }

  listenEvent<T>(eventName: string): Observable<T> {
    return new Observable<T>((subscriber) => {
      this.socket.on(eventName, (data: T) => {
        subscriber.next(data);
      });

      // Cleanup when the subscriber is destroyed
      return () => {
        this.socket.off(eventName);
      };
    });
  }

  sendUpdateTicketCounterMessage(counter: number,v_nr:number) {
    this.socket.emit('goUpdateTicketCounter', counter,v_nr);
  }
}
