import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FilmServiceService } from '../providers/film-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-start',
  standalone: true,
  providers: [FilmServiceService],
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {
  // constructor(public filmService: FilmServiceService) {
  //   filmService.getFilme().subscribe(data => {
  //     console.log(filmService.filme);
  //   });
  // }
}
/*window.onload = function() {
  var video = document.querySelector('video');
  if (video !== null) {
      video.muted = true;
  }
};*/
