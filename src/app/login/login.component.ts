import {Component, OnInit} from '@angular/core';
import {LoginAuthenticationService} from "../providers/login-authentication.service";
import { Router } from '@angular/router';
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegistrierenService} from "../providers/registrieren.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {

  showLoginForm: boolean = true; // Gibt an, ob das Anmeldeformular sichtbar ist
  showRegisterForm: boolean = false; // Gibt an, ob das Registrierungsformular sichtbar ist
  showLoginButton: boolean = false;
  showRegisterButton: boolean = true;

  successMessageRegistration: string = '';
  errorMessageLogin: string = '';
  errorMessageRegistration: string = '';
  userForm!: FormGroup;
  registerForm!: FormGroup;
  isFormSubmitted: boolean = false;
  isFormSubmittedLogin: boolean = false;

  constructor(public loginautService: LoginAuthenticationService, public registrierenService: RegistrierenService, public router: Router) {}

  ngOnInit() {
    this.userForm =  new FormGroup({
      mail: new FormControl("",[Validators.required]),
      passwort: new FormControl("",[Validators.required]),
    })

    this.registerForm = new FormGroup({
      vorname: new FormControl("", [Validators.required, Validators.minLength(3)]),
      nachname: new FormControl("", [Validators.required, Validators.minLength(3)]),
      strasseUndNr: new FormControl("", [Validators.required, Validators.minLength(5)]),
      plz: new FormControl("", [Validators.required, Validators.min(10000)]),
      stadt: new FormControl("", [Validators.required, Validators.minLength(3)]),
      geburtsdatum: new FormControl("", [Validators.required]),
      zahlungsmittel: new FormControl("", [Validators.required, Validators.minLength(22)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      choosepassword: new FormControl("", [Validators.required, Validators.minLength(6)]),
    });
  }

  toggleForms(): void {
    this.showLoginForm = !this.showLoginForm;
    this.showRegisterForm = !this.showRegisterForm;
    this.showLoginButton = !this.showLoginButton;
    this.showRegisterButton = !this.showRegisterButton;

    // Fehlermeldungen und Erfolgsmeldungen zurücksetzen, wenn getoggelt wird
    this.errorMessageLogin = '';
    this.successMessageRegistration = '';
    this.errorMessageRegistration = '';
  }

  login(): void {
    this.isFormSubmittedLogin = true;

    if (this.userForm.invalid) {
      return;
    }

    const { mail, passwort } = this.userForm.value;

    this.loginautService.login(mail, passwort).subscribe(response => {
      if (response.success) {
        console.log("Login erfolgreich");
        this.router.navigate(['/kundenkonto']);
      } else {
        this.errorMessageLogin = response.message;
        console.log("Login fehlgeschlagen");
      }
    });
  }

    registrieren(): void {
        this.isFormSubmitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        const { vorname, nachname, strasseUndNr, plz, stadt, geburtsdatum, zahlungsmittel, email, choosepassword } = this.registerForm.value;

        // Gibt es ein Konto mit dieser Mail schon?
        this.registrierenService.checkEmailExists(email).subscribe(response => {
            if (response.exists) {
                // E-Mail gibt es schon
                console.log("Kunde mit dieser Mail gibt es schon.");
                this.errorMessageRegistration = response.message;
                this.successMessageRegistration = '';
            } else {
                // Random ID generieren
                const randomId = Math.floor(Math.random() * 1000000) + 1; // Sicherstellen, dass die ID einzigartig ist

                this.registrierenService.registerCustomer({
                    id: randomId,
                    vorname,
                    nachname,
                    strasseUndNr,
                    plz,
                    stadt,
                    geburtsdatum,
                    zahlungsmittel,
                    email,
                    choosepassword
                }).subscribe(registerResponse => {
                    if (registerResponse.success) {
                        console.log("Registration erfolgreich");
                        this.successMessageRegistration = registerResponse.message;
                        this.resetForm();
                    } else {
                        console.log("Registration fehlgeschlagen");
                        this.errorMessageRegistration = registerResponse.message;
                    }
                });
            }
        });
    }

    resetForm(): void {
        this.registerForm.reset();
        this.isFormSubmitted = false;
        this.errorMessageRegistration = '';
    }

}

