import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmService } from '../providers/filmService';

@Component({
  selector: 'app-filmdetails',
  standalone: true,
  imports: [],
  templateUrl: './filmdetails.component.html',
  styleUrl: './filmdetails.component.css'
})

export class FilmdetailsComponent {
  filmtitel: string = "";
  filme: Array<any> = [];

  constructor(private route: ActivatedRoute, public filmService: FilmService ) { 
  filmService.getFilmeMitDatum().subscribe(data => {
    this.filme = filmService.filme;
  });
}

  ngOnInit(): void {
    this.filmtitel = this.route.snapshot.paramMap.get('filmtitel') ?? '';
  }
}
