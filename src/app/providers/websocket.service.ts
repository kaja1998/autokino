// my-socket.service.ts
import { Injectable } from '@angular/core';
// import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  constructor(/*private socket: Socket*/) {
    // socket.on('connection',()=>{
    //   console.log(`connected with socket: ${socket} `)
    // });
    // socket.on('updateTicketCounter',()=>{
    //   console.log(`Koks und Nutten logik `)
    // });

  }

  // sendUpdateTicketCounterMessage(msg: string) {
  //   this.socket.emit('goUpdateTicketCounter', msg);
  // }
}
