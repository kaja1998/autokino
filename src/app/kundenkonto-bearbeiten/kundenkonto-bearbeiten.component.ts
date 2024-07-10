import {Component, OnInit} from '@angular/core';
import {KundendatenService} from "../providers/kundendaten.service";
import {DatePipe, NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginAuthenticationService} from "../providers/login-authentication.service";
import {Router} from "@angular/router";
import {User} from "../user/user";

@Component({
  selector: 'app-kundenkonto-bearbeiten',
  standalone: true,
  providers: [KundendatenService],
  imports: [NgIf, ReactiveFormsModule, DatePipe],
  templateUrl: './kundenkonto-bearbeiten.component.html',
  styleUrl: './kundenkonto-bearbeiten.component.css'
})

export class KundenkontoBearbeitenComponent implements OnInit {

  user: User | null = null;
  isEditing: boolean = false;
  editForm!: FormGroup;
  isFormSubmitted = false;

  constructor(private formBuilder: FormBuilder, private kundendatenService: KundendatenService, private loginautService: LoginAuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.editForm =  this.formBuilder.group({
      passwort: ['', [Validators.required, Validators.minLength(6)]],
      vorname: new FormControl("", [Validators.required, Validators.minLength(3)]),
      nachname: new FormControl("", [Validators.required, Validators.minLength(3)]),
      strasseUndNr: new FormControl("", [Validators.required, Validators.minLength(5)]),
      plz: new FormControl("", [Validators.required, Validators.min(10000)]),
      stadt: new FormControl("", [Validators.required, Validators.minLength(3)]),
      geburtsdatum: new FormControl("", [Validators.required]),
      zahlungsmittel: new FormControl("", [Validators.required, Validators.minLength(22)]),
    });

    this.user = this.loginautService.getCurrentUser();
    this.formularBefuellen(); // Anfangswerte in das Formular setzen
  }

  //Setzt die aktuellen Benutzerdaten in das editForm, wenn der Benutzer bearbeiten klickt
  formularBefuellen(): void {
    if (this.user) {
      this.editForm.patchValue({
        vorname: this.user.vorname,
        nachname: this.user.nachname,
        strasseUndNr: this.user.strasseUndNr,
        plz: this.user.plz,
        stadt: this.user.stadt,
        geburtsdatum: this.user.geburtsdatum,
        zahlungsmittel: this.user.zahlungsmittel,
        email: this.user.mail,
        passwort: this.user.passwort,
      });
    }
  }

  datenBearbeiten(): void {
    this.isEditing = true;
  }

  kontoLoeschen(): void {
    if (this.user && confirm('Möchten Sie Ihr Konto wirklich löschen?')) {
      this.kundendatenService.deleteKunde(this.user.id).subscribe(response => {
        if (response.success) {
          console.error(response.message);
          this.loginautService.logout();
          this.router.navigate(['/login'], );
        } else {
          console.error(response.message);
        }
      }, error => {
        console.error('Fehler beim Löschen des Kontos:', error);
      });
    }
  }

  cancelEdit(): void {
    this.user = this.loginautService.getCurrentUser();
    this.formularBefuellen();    //wenn der Benutzer was bearbeitet, dann abbricht und dann wieder auf bearbeiten klickt, sind sonst noch die alten Eingaben des Benutzers im editform
    this.isEditing = false;   //das editformular wird ausgeblendet
  }

  kundenDatenAendern(): void {
    this.isFormSubmitted = true;
    if (this.editForm.valid) {
      const formData = this.editForm.value;
      if (this.user) {
        const updatedUser: User = {
          ...this.user,
          vorname: formData.vorname,
          nachname: formData.nachname,
          strasseUndNr: formData.strasseUndNr,
          plz: formData.plz,
          stadt: formData.stadt,
          geburtsdatum: formData.geburtsdatum,
          zahlungsmittel: formData.zahlungsmittel,
          passwort: formData.passwort,
        };
        this.kundendatenService.updateKundendaten(updatedUser).subscribe(response => {
          if (response.success) {
            this.loginautService.setCurrentUser(updatedUser);
            this.user = updatedUser;
            this.isEditing = false;
            console.log('Kundendaten erfolgreich aktualisiert.');
          } else {
            console.error(response.message);
          }
        }, error => {
          console.error('Serverfehler:', error);
        });
      }
    } else {
      console.error('Formular ist nicht gültig.');
    }
  }
}
