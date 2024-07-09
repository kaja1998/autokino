import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../providers/filmService';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TicketCounterService } from '../providers/ticket-counter.service';
import { WebSocketService } from '../providers/websocket.service'; 
import { combineLatest } from 'rxjs';

interface Veranstaltung {
  veranstaltungs_nr: number;
}

interface Platz {
  plaetze: number;
}

@Component({
  selector: 'app-filmdetails',
  standalone: true,
  providers: [],
  imports: [CommonModule, NgFor, RouterLink],
  templateUrl: './filmdetails.component.html',
  styleUrls: ['./filmdetails.component.css']
})
export class FilmdetailsComponent implements OnInit {
  filmtitel: string = "";
  film: any = {};
  veranstaltungen: Veranstaltung[] = [];
  public ticketanzahl = 0;
  public veranstaltungs_nr = 0;

  constructor(
    private route: ActivatedRoute,
    public filmService: FilmService,
    private ticketCounterService: TicketCounterService,
    private webSocketService: WebSocketService,
    private cdr: ChangeDetectorRef
  ) {
    this.ticketCounterService.ticketCounter$.subscribe(counter => {
      this.ticketanzahl = counter;
      this.cdr.detectChanges();
    });
    this.ticketCounterService.veranstaltungsNr$.subscribe(v_nr => {
      this.veranstaltungs_nr = v_nr;
      const isValid = this.checkVeranstaltungsNr(v_nr);
      if (isValid) {
        this.updatePlaetze(v_nr);
      }
      this.cdr.detectChanges();
    });
  }

  ngOnInit(): void {
    this.filmtitel = this.route.snapshot.paramMap.get('filmtitel') ?? '';
    this.filmService.getFilm(this.filmtitel).subscribe(data => {
      this.film = data;
      this.veranstaltungen = this.film[0].veranstaltungs_nummern;
    });
  }

  checkVeranstaltungsNr(v_nr: number): boolean {
    if (this.veranstaltungen && this.veranstaltungen.length > 0) {
      return this.veranstaltungen.some((veranstaltung: Veranstaltung) => veranstaltung.veranstaltungs_nr === v_nr);
    }
    return false;
  }

  updatePlaetze(v_nr: number): void {
    const index = this.veranstaltungen.findIndex(
      (veranstaltung: Veranstaltung) => veranstaltung.veranstaltungs_nr === v_nr
    );
    if (index !== -1 && this.film[0].plaetze && this.film[0].plaetze[index]) {
      this.film[0].plaetze[index].plaetze = this.ticketanzahl;
      console.log(`Die Anzahl der Plätze für Veranstaltungsnummer ${v_nr} wurde auf ${this.ticketanzahl} aktualisiert.`);
    } else {
      console.log(`Keine Plätze gefunden für Veranstaltungsnummer ${v_nr}.`);
    }
  }
}
