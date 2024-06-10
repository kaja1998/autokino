import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kartenkaufen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kartenkaufen.component.html',
  styleUrl: './kartenkaufen.component.css'
})
export class KartenkaufenComponent {
  checkboxes = Array.from({ length: 60 }, (_, i) => `platz${i + 1}`);
}

