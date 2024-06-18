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
  vorname: string = "";

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.vorname = this.user.vorname;
  }

}
