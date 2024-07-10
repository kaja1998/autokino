import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {KundendatenService} from "../providers/kundendaten.service";
import {User} from "../user/user";
import {LoginAuthenticationService} from "../providers/login-authentication.service";

@Component({
  selector: 'app-kundenkonto',
  standalone: true,
  imports: [RouterLink, NgForOf, NgIf, DatePipe],
  templateUrl: './kundenkonto.component.html',
  styleUrl: './kundenkonto.component.css'
})

export class KundenkontoComponent implements OnInit {

  user: User | null = null;
  tickets: any[] = [];

  constructor(private kundendatenService: KundendatenService, private loginautService: LoginAuthenticationService) {}

  ngOnInit(): void {
    this.user = this.loginautService.getCurrentUser();

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

  getparkplatzNr (ticketNr: string): string {
    const parts = ticketNr.split('_');
    return parts.length > 1 ? parts[1] : '';
  }
}
