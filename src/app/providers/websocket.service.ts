// my-socket.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketCounterService } from './ticket-counter.service';
import { io } from "socket.io-client"
const socket = io("ws://localhost:8080/")
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  constructor(private ticketCounterService: TicketCounterService) {
     console.log('Provider funktioniert')
      socket.on('connection',()=>{
        console.log(`connected with socket: ${socket} `)
      });
      socket.on('updateTicketCounter',(counter)=>{
        console.log(`send to all dev`,counter)
        this.ticketCounterService.updateTicketCounter(counter);
      });
    
  }
  listenEvent<T>(eventName: string): Observable<T> {
    return new Observable<T>((subscriber) => {
      socket.on(eventName, (data: T) => {
        subscriber.next(data);
      });

      // Cleanup when the subscriber is destroyed
      return () => {
        socket.off(eventName);
      };
    });
  }
   sendUpdateTicketCounterMessage(counter: number) {
    socket.emit('goUpdateTicketCounter', counter);
   }
}
