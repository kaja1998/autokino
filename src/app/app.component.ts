import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {LoginAuthenticationService} from "./providers/login-authentication.service";
import {NgIf} from "@angular/common";



@Component({
  selector: 'app-root',
  standalone: true,
  providers: [HttpClient],
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'auto-kino';
  isLoggedIn: boolean = false;

  //Wenn ein Link geklickt wird, scrollt die Website bis nach oben, im Footer sonst mega nervig
  constructor(private router: Router, private authService: LoginAuthenticationService) { }

  ngOnInit() {
    this.authService.isUserLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });

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
