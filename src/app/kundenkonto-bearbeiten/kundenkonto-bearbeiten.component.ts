import {Component, OnInit} from '@angular/core';
import {KundendatenService} from "../providers/kundendaten.service";
import {NgIf} from "@angular/common";
import { formatDate } from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-kundenkonto-bearbeiten',
  standalone: true,
  providers: [KundendatenService],
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './kundenkonto-bearbeiten.component.html',
  styleUrl: './kundenkonto-bearbeiten.component.css'
})

export class KundenkontoBearbeitenComponent implements OnInit {

  user: any = "";
  isEditing: boolean = false;
  editForm!: FormGroup;
  isFormSubmitted = false;

  constructor(private formBuilder: FormBuilder, private kundendatenService: KundendatenService) {}

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

    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
      this.formularBefuellen(); // Anfangswerte in das Formular setzen
    }
  }

  //Setzt die aktuellen Benutzerdaten in das editForm, wenn der Benutzer bearbeiten klickt
  formularBefuellen(): void {
    this.editForm.patchValue({
      vorname: this.user.vorname,
      nachname: this.user.nachname,
      strasseUndNr: this.user.strasseUndNr,
      plz: this.user.plz,
      stadt: this.user.stadt,
      geburtsdatum: this.user.geburtsdatum,
      zahlungsmittel: this.user.zahlungsmittel,
      email: this.user.email,
      passwort: this.user.passwort,
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return ''; // Sicherstellen, dass ein Datum vorhanden ist
    const date = new Date(dateString);
    return formatDate(date, 'dd.MM.yyyy', 'en-US'); // Formatierung in DD.MM.YYYY
  }

  datenBearbeiten(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
      this.formularBefuellen();    //wenn der Benutzer was bearbeitet, dann abbricht und dann wieder auf bearbeiten klickt, sind sonst noch die alten Eingaben des Benutzers im editform
    }
    this.isEditing = false;   //das editformular wird ausgeblendet
  }

  kundenDatenAendern(): void {
    this.isFormSubmitted = true;
    if (this.editForm.valid) {
      const formData = this.editForm.value;
      this.user = {
        ...this.user,
        vorname: formData.vorname,
        nachname: formData.nachname,
        strasseUndNr: formData.strasseUndNr,
        plz: formData.plz,
        stadt: formData.stadt,
        zahlungsmittel: formData.zahlungsmittel,
        passwort: formData.passwort,
      };
      this.kundendatenService.updateKundendaten(this.user).subscribe(response => {
        if (response.success) {
          localStorage.setItem('user', JSON.stringify(this.user));
          this.isEditing = false;
          console.log('Kundendaten erfolgreich aktualisiert.');
        } else {
          console.error(response.message);
        }
      }, error => {
        console.error('Serverfehler:', error);
      });
    } else {
      console.error('Formular ist nicht gültig.');
    }
  }
}
