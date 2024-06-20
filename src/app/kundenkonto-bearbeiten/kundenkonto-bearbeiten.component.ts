import {Component, OnInit} from '@angular/core';
import {KundendatenService} from "../providers/kundendaten.service";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-kundenkonto-bearbeiten',
  standalone: true,
  providers: [KundendatenService],
  imports: [NgIf, FormsModule],
  templateUrl: './kundenkonto-bearbeiten.component.html',
  styleUrl: './kundenkonto-bearbeiten.component.css'
})

export class KundenkontoBearbeitenComponent implements OnInit {

  user: any = "";
  isEditing: boolean = false;

  constructor(private kundendatenService: KundendatenService) {}

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {     //wenn nicht null, dann parse String zurück in ein Objekt
      this.user = JSON.parse(userString);
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return ''; // Sicherstellen, dass ein Datum vorhanden ist
    const date = new Date(dateString);
    return formatDate(date, 'dd.MM.yyyy', 'en-US'); // Formatierung in DD-MM-YYYY
  }

  datenbearbeiten(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }
    this.isEditing = false;
  }

  kundenDatenAendern(): void {
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
  }
}
