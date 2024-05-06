import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StartComponent } from './home/start.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'auto-kino';
}
