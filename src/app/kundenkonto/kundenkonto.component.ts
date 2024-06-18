import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {LoginAuthenticationService} from "../providers/login-authentication.service";

@Component({
  selector: 'app-kundenkonto',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './kundenkonto.component.html',
  styleUrl: './kundenkonto.component.css'
})
export class KundenkontoComponent implements OnInit {

  user: any = "";
  vorname: any = "";

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.vorname = localStorage.getItem('userVorname');
    console.log(this.vorname);
  }

}
