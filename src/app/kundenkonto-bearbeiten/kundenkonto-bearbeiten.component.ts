import { Component } from '@angular/core';

@Component({
  selector: 'app-kundenkonto-bearbeiten',
  standalone: true,
  imports: [],
  templateUrl: './kundenkonto-bearbeiten.component.html',
  styleUrl: './kundenkonto-bearbeiten.component.css'
})
export class KundenkontoBearbeitenComponent {

  vorname: string = "Max";
  nachname: string = "Mustermann";
  strasse: string = "Musterstraße 123";
  plz: string = "12345";
  stadt: string = "Musterstadt";
  geburtsdatum: string = "01.01.1980";
  email: string = "max.mustermann@gmail.com";

  datenbearbeiten() {
  }

  pwbearbeiten() {
  }

}
