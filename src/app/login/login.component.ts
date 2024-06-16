import { Component } from '@angular/core';
import {LoginAuthenticationService} from "../providers/login-authentication.service";
import { Router } from '@angular/router';
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule],
  providers: [LoginAuthenticationService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  showLoginForm: boolean = true; // Gibt an, ob das Anmeldeformular sichtbar ist
  showRegisterForm: boolean = false; // Gibt an, ob das Registrierungsformular sichtbar ist
  showLoginButton: boolean = false;
  showRegisterButton: boolean = true;

  mail: string = '';
  passwort: string = '';
  errorMessage: string = '';

  constructor(public loginautService: LoginAuthenticationService, public router: Router) {
  }

  toggleForms(): void {
    this.showLoginForm = !this.showLoginForm;
    this.showRegisterForm = !this.showRegisterForm;
    this.showLoginButton = !this.showLoginButton;
    this.showRegisterButton = !this.showRegisterButton;
  }

  login(): void {
    this.loginautService.login(this.mail, this.passwort).subscribe(response => {
      if (response.success) {
        console.log("Login successful");
        this.loginautService.setLoggedIn(true);
        this.router.navigate(['/kundenkonto']);
      } else {
        this.errorMessage = "Achtung: Die E-Mail-Adresse oder das Passwort stimmen nicht mit den bei uns hinterlegten Daten überein. Bitte überprüfe deine Eingaben und versuche es noch mal.";
        console.log("Login failed", response.message);
      }
    });
  }
}

