import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../providers/filmService';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };

@Component({
  selector: 'app-filmdetails',
  standalone: true,
  providers: [
    { provide: SocketIoModule, useValue: config }
  ],
  imports: [CommonModule, NgFor,RouterLink],
  templateUrl: './filmdetails.component.html',
  styleUrl: './filmdetails.component.css'
})

export class FilmdetailsComponent {
  filmtitel: string = "";
  film: any = {};
  veranstaltungen: any = {};

  constructor(private route: ActivatedRoute, public filmService: FilmService ) { 
    
}

  ngOnInit(): void {
    this.filmtitel = this.route.snapshot.paramMap.get('filmtitel') ?? ''
    this.filmService.getFilm(this.filmtitel).subscribe(data => {
    this.film = data;
    this.veranstaltungen = this.film[0].veranstaltungs_nummern;
    console.log(this.veranstaltungen)
  });
}

}
