// filmdetails.component.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../providers/filmService';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TicketCounterService } from '../providers/ticket-counter.service';
import { WebSocketService } from '../providers/websocket.service'; 

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
  veranstaltungen: any = {};
  public ticketanzahl = 0;
  public veranstaltungs_nr = 0

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
      this.cdr.detectChanges();
    })
    console.log(this.ticketanzahl)
    console.log(this.veranstaltungs_nr)
  }

  ngOnInit(): void {
    this.filmtitel = this.route.snapshot.paramMap.get('filmtitel') ?? '';
    this.filmService.getFilm(this.filmtitel).subscribe(data => {
      this.film = data;
      this.veranstaltungen = this.film[0].veranstaltungs_nummern;
    });
  }
}
