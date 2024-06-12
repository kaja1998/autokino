import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FilmServiceService } from '../providers/film-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filmdetails',
  standalone: true,
  providers: [FilmServiceService],
  imports: [RouterOutlet, RouterLink, DatePipe, CommonModule],
  templateUrl: './filmdetails.component.html',
  styleUrl: './filmdetails.component.css'
})

export class FilmdetailsComponent {

  constructor(public filmService: FilmServiceService) {
    filmService.getFilme().subscribe(data => {
      console.log(filmService.filme);
    });
  }
}
