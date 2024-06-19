import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FilmService } from '../providers/filmService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filmdetails',
  standalone: true,
  providers: [FilmService],
  imports: [RouterOutlet, RouterLink, DatePipe, CommonModule],
  templateUrl: './filmdetails.component.html',
  styleUrl: './filmdetails.component.css'
})

export class FilmdetailsComponent {

  constructor(public filmService: FilmService) {
    filmService.getFilme().subscribe(data => {
      console.log(filmService.filme);
    });
  }
}
