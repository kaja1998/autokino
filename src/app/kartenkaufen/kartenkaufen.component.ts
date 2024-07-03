
import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { KartenkaufenService } from '../providers/kartenkaufen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginAuthenticationService } from '../providers/login-authentication.service';
import { WebSocketService } from '../providers/websocket.service';

@Component({
  selector: 'app-kartenkaufen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kartenkaufen.component.html',
  styleUrls: ['./kartenkaufen.component.css']
})



export class KartenkaufenComponent implements OnInit {
  // Start Parkplatzauswahl
  public zerosArray: number[] = Array(60).fill(0);
  public previousIndex: number | null = null;
  public currentIndex: number = 0;
  public ticket: Array<{ ticket_nr: string; veranstaltungs_nr: string; [key: string]: any }> = [];
  public ticket_nr: Array<any> = [];


  adultTickets: number = 0;
  adultPrice: number = 13;
  adultPriceDisplay: number = 0;
  discountedTickets: number = 0;
  discountedPrice: number = 10;
  discountedPriceDisplay: number = 0;
  childTickets: number = 0;
  childPrice: number = 9;
  childPriceDisplay: number = 0;
  totalTickets: number = 0;
  maxTickets: number = 7;
  sum: number = 0;
  isLoggedIn: Boolean = false;
  veranstaltungs_nr: string = '';
  user: any = "";


  constructor(private route: ActivatedRoute, public KartenkaufenService: KartenkaufenService,public router: Router,private authService: LoginAuthenticationService, public websocketserice: WebSocketService ){
   

  }
 

  ngOnInit(): void {
    this.veranstaltungs_nr = this.route.snapshot.paramMap.get('veranstaltungs_nr') ?? '';
    console.log(this.veranstaltungs_nr+"a")
    this.authService.isUserLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  
    const userString = localStorage.getItem('user');
    if (userString) { // wenn nicht null, dann parse String zurück in ein Objekt
      this.user = JSON.parse(userString);
    }
  
    this.KartenkaufenService.getticket().subscribe(data => {
      this.ticket = this.KartenkaufenService.tickets;
      this.ticket_nr = this.sortAndExtractTicketNr(this.ticket, this.veranstaltungs_nr);
      this.ticket_nr = this.cutTicket_nr(this.ticket_nr);
      this.fillParkSpots(this.ticket_nr);
    });
  }
  
  public sortAndExtractTicketNr(tickets: Array<{ ticket_nr: string; [key: string]: any }>, veranstaltungs_nr: string): Array<string> {
    return tickets
      .filter(ticket => ticket.ticket_nr.split('_')[0] === veranstaltungs_nr) // Filter nach veranstaltungs_nr
      .sort((a, b) => {
        const numA = parseInt(a.ticket_nr.split('_')[1]);
        const numB = parseInt(b.ticket_nr.split('_')[1]);
        return numA - numB;
      })
      .map(ticket => ticket.ticket_nr);
  }
  
  public cutTicket_nr(inputArray: string[]): number[] {
    return inputArray.map(item => {
      const numberPart = item.split('_')[1];
      return parseInt(numberPart, 10) - 1;
    });
  }
  

public fillParkSpots(indices: number[]): void {
  indices.forEach(index => {
    if (index >= 0 && index < this.zerosArray.length) {
      this.zerosArray[index] = 2;
    }
  });
}


  public select(index: number) {
    if (this.previousIndex !== null && this.zerosArray[this.previousIndex] !== 2) {
      this.zerosArray[this.previousIndex] = 0;
    }
    if(this.zerosArray[index] !== 2){
    this.zerosArray[index] = 1;
    this.previousIndex = index;
    this.currentIndex = index;
    }
  }

  // Start Kaufsystem


  ticketkaufen(){
  if(this.isLoggedIn === false){
    document.getElementById('fehler_a')!.style.display = 'none';
    document.getElementById('fehler_b')!.style.display = 'none';
    document.getElementById('fehler_c')!.style.display = 'none';
    document.getElementById('fehler_d')!.style.display = 'flex';
  }else if(this.previousIndex === null){
      document.getElementById('fehler_a')!.style.display = 'flex';
      document.getElementById('fehler_b')!.style.display = 'none';
      document.getElementById('fehler_c')!.style.display = 'none';
      document.getElementById('fehler_d')!.style.display = 'none';
    }else if(this.adultTickets === 0 && this.discountedTickets === 0 && this.childTickets === 0){
      document.getElementById('fehler_a')!.style.display = 'none';
      document.getElementById('fehler_b')!.style.display = 'flex';
      document.getElementById('fehler_c')!.style.display = 'none';
      document.getElementById('fehler_d')!.style.display = 'none';
    }else if(this.adultTickets === 0 && this.discountedTickets === 0){
      document.getElementById('fehler_a')!.style.display = 'none';
      document.getElementById('fehler_b')!.style.display = 'none';
      document.getElementById('fehler_c')!.style.display = 'flex';
      document.getElementById('fehler_d')!.style.display = 'none';
    }else{
      const jointTicket_nr: string = this.veranstaltungs_nr.toString() + '_' +  this.currentIndex.toString(); // string mit nummer _ nummer
      this.KartenkaufenService.setticket(jointTicket_nr,this.user.id,parseInt(this.veranstaltungs_nr),this.adultTickets,this.discountedTickets,this.childTickets).subscribe()
      this.zerosArray[this.currentIndex] = 2;
      console.log("Kaufen erfolgreich")
      this.websocketserice.sendUpdateTicketCounterMessage('nutte')
      this.router.navigate(['/kundenkonto']);

    }
  }

  addErwachsener() {
    if (this.totalTickets < this.maxTickets) {
      this.adultTickets++;
      this.totalTickets++;
      this.adultPriceDisplay = this.adultTickets * this.adultPrice;
      this.sum = this.sum + this.adultPrice;
      console.log(`Erwachsene: ${this.adultTickets}, Total: ${this.totalTickets}, ${this.sum}`);
    }
  }

  removeErwachsener() {
    if (this.adultTickets > 0) {
      this.adultTickets--;
      this.totalTickets--;
      this.adultPriceDisplay = this.adultPriceDisplay - this.adultPrice;
      this.sum = this.sum - this.adultPrice;
      console.log(`Erwachsene: ${this.adultTickets}, Total: ${this.totalTickets}`);
    }
  }

  addErmaessigt() {
    if (this.totalTickets < this.maxTickets) {
      this.discountedTickets++;
      this.totalTickets++;
      this.discountedPriceDisplay = this.discountedTickets * this.discountedPrice;
      this.sum = this.sum + this.discountedPrice;
      console.log(`Ermäßigt: ${this.discountedTickets}, Total: ${this.totalTickets}`);
    }
  }

  removeErmaessigt() {
    if (this.discountedTickets > 0) {
      this.discountedTickets--;
      this.totalTickets--;
      this.discountedPriceDisplay = this.discountedPriceDisplay - this.discountedPrice;
      this.sum = this.sum - this.discountedPrice;
      console.log(`Ermäßigt: ${this.discountedTickets}, Total: ${this.totalTickets}`);
    }
  }

  addKind() {
    if (this.totalTickets < this.maxTickets) {
      this.childTickets++;
      this.totalTickets++;
      this.childPriceDisplay = this.childTickets * this.childPrice;
      this.sum = this.sum + this.childPrice;
      console.log(`Kinder: ${this.childTickets}, Total: ${this.totalTickets}`);
    }
  }

  removeKind() {
    if (this.childTickets > 0) {
      this.childTickets--;
      this.totalTickets--;
      this.childPriceDisplay = this.childPriceDisplay - this.childPrice;
      this.sum = this.sum - this.childPrice;
      console.log(`Kinder: ${this.childTickets}, Total: ${this.totalTickets}`);
    }
  }
}



/**
 *   -- Brainstorm --
 * 1. Fehlermeldungen unter der Parkplatzauswahl / Push notification ?
 * 2. MySql Ticket_nr zu String oder varchar.
 * 3. Ticket_nr .toString erstellen
 * 4. Check Kunde eingeloggt -> if false = login weiterleiten
 * 5. Kauf erfolgreich -> neue Seite (Kauf erfolgreich message)
 * 6. besetzte Parkplätze auslesen bei aufruf
 * 7. veranstaltungs_nr mit kartenkaufen verknüpfen (Isabelle oder Kaja oder Lasse fragen)
 * 8. web sockets
 */
