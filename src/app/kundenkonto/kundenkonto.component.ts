import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {KundendatenService} from "../providers/kundendaten.service";

@Component({
  selector: 'app-kundenkonto',
  standalone: true,
  imports: [RouterLink, NgForOf, NgIf, DatePipe],
  templateUrl: './kundenkonto.component.html',
  styleUrl: './kundenkonto.component.css'
})
export class KundenkontoComponent implements OnInit {

  user: any = "";
  tickets: any[] = [];

  constructor(private kundendatenService: KundendatenService) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {     //wenn nicht null, dann parse String zurück in ein Objekt
      this.user = JSON.parse(userString);
    }

    if (this.user && this.user.id) {  //stellt sicher, dass user und die id existieren
      this.kundendatenService.getUserTickets(this.user.id).subscribe(
          (data: any[]) => {
            this.tickets = data;
          },
          error => {
            console.error('Error beim Laden der Tickets:', error);
          }
      );
    } else {
      console.error('User or user ID nicht gefunden.');
    }
  }
}
