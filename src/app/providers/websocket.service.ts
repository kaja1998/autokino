// my-socket.service.ts
import { Injectable } from '@angular/core';
// import { Socket } from 'ngx-socket-io';

import { io } from "socket.io-client"
const socket = io("ws://localhost:8080")
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  constructor(/*private socket: Socket*/) {
     console.log('DU F NUTTE')
      socket.on('connection',()=>{
        console.log(`connected with socket: ${socket} `)
      });
      socket.on('updateTicketCounter',()=>{
        console.log(`Koks und Nutten logik `)
      });
    
  }

   sendUpdateTicketCounterMessage(msg: string) {
    socket.emit('goUpdateTicketCounter', msg);
   }
}
