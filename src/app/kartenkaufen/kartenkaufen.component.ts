import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kartenkaufen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kartenkaufen.component.html',
  styleUrls: ['./kartenkaufen.component.css']
})


export class KartenkaufenComponent {
    // this.zerosArray[index] = this.zerosArray[index] === 0 ? 1 : 0


  // Start Parkplatzauswahl
  zerosArray: number[] = Array(60).fill(0);
  previousIndex: number | null = null;
  public select(index: number) {
    if (this.previousIndex !== null) {
      this.zerosArray[this.previousIndex] = 0;
    }
    this.zerosArray[index] = 1;
    this.previousIndex = index;
  }


  // Start Kaufsystem
  adultTickets: number = 0;
  discountedTickets: number = 0;
  childTickets: number = 0;
  totalTickets: number = 0;
  maxTickets: number = 7;

  constructor() {
    this.initEventListeners();
    this.updateTotalSum();
  }

  initEventListeners() {
    document.querySelectorAll('.ticket-button').forEach((button) => {
      button.addEventListener('click', (event) => this.handleButtonClick(event));
    });
  }

  handleButtonClick(event: Event) {
    const target = event.target as HTMLButtonElement;
    const container = target.closest('.container-Karten') || target.closest('.container-info');

    if (container) {
      if (container.querySelector('p')?.textContent?.includes('Erwachsener')) {
        this.updateCounter(target, 'adultTickets', container);
      } else if (container.querySelector('p')?.textContent?.includes('Ermäßigt')) {
        this.updateCounter(target, 'discountedTickets', container);
      } else if (container.querySelector('p')?.textContent?.includes('Kind')) {
        this.updateCounter(target, 'childTickets', container);
      }
    }
    this.updateTotalSum();
  }

  updateCounter(target: HTMLButtonElement, ticketType: 'adultTickets' | 'discountedTickets' | 'childTickets', container: Element) {
    if (target.textContent === '+') {
      if (this.totalTickets < this.maxTickets) {
        this[ticketType]++;
        this.totalTickets++;
      }
    } else if (target.textContent === '-') {
      if (this[ticketType] > 0) {
        this[ticketType]--;
        this.totalTickets--;
      }
    }
    this.updateDisplay(ticketType, container);
  }

  updateDisplay(ticketType: 'adultTickets' | 'discountedTickets' | 'childTickets', container: Element) {
    const ticketTextMap: { [key: string]: string } = {
      adultTickets: 'Erwachsener',
      discountedTickets: 'Ermäßigt',
      childTickets: 'Kind',
    };

    const ticketPriceMap: { [key: string]: number } = {
      adultTickets: 13,
      discountedTickets: 10,
      childTickets: 9,
    };

    const ticketCount = this[ticketType];
    const ticketTypeText = ticketTextMap[ticketType];
    const ticketPrice = ticketPriceMap[ticketType];
    const totalPrice = ticketCount * ticketPrice;
    
    const pElement = container.querySelector('p');
    if (pElement) {
      if (ticketCount > 0) {
        pElement.textContent = `${ticketCount}x ${ticketTypeText} ${totalPrice}€`;
      } else {
        pElement.textContent = `${ticketCount}x ${ticketTypeText}`;
      }
    }
  }

  updateTotalSum() {
    const totalSum = (this.adultTickets * 13) + (this.discountedTickets * 10) + (this.childTickets * 9);
    const sumElement = document.querySelector('.container-Summe .container-Summeinfo p');
    if (sumElement) {
      sumElement.textContent = `Summe: ${totalSum}€`;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new KartenkaufenComponent();
});


/** 
 * - Kein Parkplatz ausgewählt
 * - Kein Erwachsener / Ermäßigt ausgewählt
 * - 7 Kinder ausgewählt
 */