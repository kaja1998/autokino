import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-bereich',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './admin-bereich.component.html',
  styleUrl: './admin-bereich.component.css'
})
export class AdminBereichComponent {

}
