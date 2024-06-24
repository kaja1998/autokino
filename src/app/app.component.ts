import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {LoginAuthenticationService} from "./providers/login-authentication.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {Observable} from "rxjs";




@Component({
  selector: 'app-root',
  standalone: true,
  providers: [HttpClient],
  imports: [RouterOutlet, RouterLink, NgIf, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'auto-kino';
  isLoggedIn: Observable<boolean>

  //Wenn ein Link geklickt wird, scrollt die Website bis nach oben, im Footer sonst mega nervig
  constructor(private router: Router, private authService: LoginAuthenticationService) {
    this.isLoggedIn = this.authService.isUserLoggedIn$;
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
