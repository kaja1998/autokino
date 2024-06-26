import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KartenkaufenService } from '../providers/kartenkaufen.service';
@Component({
  selector: 'app-kartenkaufen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kartenkaufen.component.html',
  styleUrls: ['./kartenkaufen.component.css']
})


export class KartenkaufenComponent {
  // Start Parkplatzauswahl
  zerosArray: number[] = Array(60).fill(0);
  previousIndex: number | null = null;


  constructor(public KartenkaufenService: KartenkaufenService){

  }
  public select(index: number) {
    if (this.previousIndex !== null) {
      this.zerosArray[this.previousIndex] = 0;
    }
    this.zerosArray[index] = 1;
    this.previousIndex = index;
  }
  
  // Start Kaufsystem
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
  
  ticketkaufen(){
    this.KartenkaufenService.getticket(1,1,1,this.adultTickets,this.discountedTickets,this.childTickets)
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
 * - Kein Parkplatz ausgewählt
 * - Kein Erwachsener / Ermäßigt ausgewählt
 * - 7 Kinder ausgewählt
 * - Check Kunde eingeloggt
 * - Wenn Kaufen richtig Parkplatz -> rot
 * - Ticket auslesen
 */