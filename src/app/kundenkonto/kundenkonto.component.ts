import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-kundenkonto',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './kundenkonto.component.html',
  styleUrl: './kundenkonto.component.css'
})
export class KundenkontoComponent implements OnInit {

  user: any = "";

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {     //wenn nicht null, dann parse String zurück in ein Objekt
      this.user = JSON.parse(userString);
    }
  }

}
