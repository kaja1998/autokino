import {Component, OnChanges} from '@angular/core';
import {RouterLink} from "@angular/router";
import {LoginAuthenticationService} from "../providers/login-authentication.service";

@Component({
  selector: 'app-kundenkonto',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './kundenkonto.component.html',
  styleUrl: './kundenkonto.component.css'
})
export class KundenkontoComponent implements OnChanges {

  user: any = "";

  ngOnChanges(): void {
    this.user = localStorage.getItem('user');
  }

}
