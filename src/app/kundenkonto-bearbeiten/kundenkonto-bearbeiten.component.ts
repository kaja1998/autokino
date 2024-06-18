import { Component } from '@angular/core';
import {KundendatenService} from "../providers/kundendaten.service";

@Component({
  selector: 'app-kundenkonto-bearbeiten',
  standalone: true,
  providers: [KundendatenService],
  imports: [],
  templateUrl: './kundenkonto-bearbeiten.component.html',
  styleUrl: './kundenkonto-bearbeiten.component.css'
})

export class KundenkontoBearbeitenComponent {

  constructor(public kundendatenService: KundendatenService) {
    kundendatenService.getKundendaten().subscribe(data => {
      console.log(kundendatenService);
    });
  }

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
