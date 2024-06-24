import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-filmdetails',
  standalone: true,
  imports: [],
  templateUrl: './filmdetails.component.html',
  styleUrl: './filmdetails.component.css'
})

export class FilmdetailsComponent {
  constructor(private route: ActivatedRoute) { }

  filmtitel: string = ""

  ngOnInit(): void {
    this.filmtitel = this.route.snapshot.paramMap.get('filmtitel') ?? '';
  }

}
