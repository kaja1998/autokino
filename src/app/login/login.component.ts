import { Component } from '@angular/core';
import {LoginAuthenticationService} from "../providers/login-authentication.service";
import { Router } from '@angular/router';
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegistrierenService} from "../providers/registrieren.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  providers: [LoginAuthenticationService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  showLoginForm: boolean = true; // Gibt an, ob das Anmeldeformular sichtbar ist
  showRegisterForm: boolean = false; // Gibt an, ob das Registrierungsformular sichtbar ist
  showLoginButton: boolean = false;
  showRegisterButton: boolean = true;

  errorMessageLogin: string = '';
  errorMessageRegistration: string = '';
  userForm!: FormGroup;
  registerForm!: FormGroup;
  isFormSubmitted: boolean = false;
  isFormSubmittedLogin: boolean = false;

  constructor(public loginautService: LoginAuthenticationService, public registrierenService: RegistrierenService, public router: Router) {
    this.userForm =  new FormGroup({
      mail: new FormControl("",[Validators.required]),
      passwort: new FormControl("",[Validators.required]),
    })

    this.registerForm = new FormGroup({
      vorname: new FormControl("", [Validators.required]),
      nachname: new FormControl("", [Validators.required]),
      strasseUndNr: new FormControl("", [Validators.required]),
      plz: new FormControl("", [Validators.required]),
      stadt: new FormControl("", [Validators.required]),
      geburtstag: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      choosepassword: new FormControl("", [Validators.required]),
    });
  }

  toggleForms(): void {
    this.showLoginForm = !this.showLoginForm;
    this.showRegisterForm = !this.showRegisterForm;
    this.showLoginButton = !this.showLoginButton;
    this.showRegisterButton = !this.showRegisterButton;
  }

  login(): void {
    this.isFormSubmittedLogin = true;

    if (this.userForm.invalid) {
      return;
    }

    const { mail, passwort } = this.userForm.value;

    this.loginautService.login(mail, passwort).subscribe(response => {
      if (response.success) {
        console.log("Login successful");
        this.loginautService.setLoggedIn(true);
        this.router.navigate(['/kundenkonto']);
      } else {
        this.errorMessageLogin = response.message;
        console.log("Login failed", response.message);
      }
    });
  }

  registrieren(): void {
    this.isFormSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const { vorname, nachname, strasseUndNr, plz, stadt, geburtstag, email, choosepassword } = this.registerForm.value;

    // Gibt es ein Konto mit dieser Mail schon?
    this.registrierenService.checkEmailExists(email).subscribe(response => {
      if (response.exists) {
        // E-Mail gibt es schon
        this.errorMessageRegistration = response.message;
      } else {
        // Random ID generieren
        const randomId = Math.floor(Math.random() * 1000) + 1;

        this.registrierenService.registerCustomer({
          id: randomId,
          vorname,
          nachname,
          strasseUndNr,
          plz,
          stadt,
          geburtstag,
          email,
          passwort: choosepassword
        }).subscribe(registerResponse => {
          if (registerResponse.success) {
            console.log("Registration successful");
            // Kunden automatisch einloggen?
            // this.loginautService.login(email, choosepassword).subscribe(loginResponse => {
            //   if (loginResponse.success) {
            //     console.log("Login after registration successful");
            //     this.loginautService.setLoggedIn(true);
            //     this.router.navigate(['/kundenkonto']);
            //   }
            // });
          } else {
            console.log("Registration failed", registerResponse.message);
            this.errorMessageRegistration = "Es gab ein Problem bei der Registrierung. Bitte versuche es später erneut.";
          }
        });
      }
    });
  }
}

