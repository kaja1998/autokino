import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FilmService } from '../providers/filmService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-start',
  standalone: true,
  providers: [FilmService],
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})

export class StartComponent {
  filme: any[] = [];
  constructor(public filmService: FilmService) {
    filmService.getFilmHighlights().subscribe(data => {
      this.filme = data;
    });
  }
}

