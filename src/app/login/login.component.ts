import { Component } from '@angular/core';
import {LoginAuthenticationService} from "../providers/login-authentication.service";
import { Router } from '@angular/router';
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

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

  errorMessage: string = '';
  userForm!: FormGroup;
  registerForm!: FormGroup;
  isFormSubmitted: boolean = false;
  isFormSubmittedLogin: boolean = false;

  constructor(public loginautService: LoginAuthenticationService, public router: Router) {
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
        this.errorMessage = response.message;
        console.log("Login failed", response.message);
      }
    });
  }

  register(): void {
    this.isFormSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    // Handle registration logic here
    console.log("Registration form submitted successfully!");
  }


}

