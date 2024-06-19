import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FilmService } from '../providers/filmService';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-programm',
  standalone: true,
  providers: [FilmService],
  imports: [RouterOutlet, RouterLink, DatePipe],
  templateUrl: './programm.component.html',
  styleUrl: './programm.component.css'
})



export class ProgrammComponent implements OnInit {

  datum1 = new Date(2024,1,9);
  filme : Array<any> = [];

  constructor(public filmService: FilmService) {
    filmService.getFilme().subscribe(data => {
      this.filme = filmService.filme;
    });

 
  

  ngOnInit(): void {
    const clearIcon = document.querySelector(".clear-icon") as HTMLElement;
    const searchBar = document.querySelector(".search") as HTMLInputElement;

    searchBar.addEventListener("keyup", () => {
      if (searchBar.value && clearIcon.style.visibility != "visible") {
        clearIcon.style.visibility = "visible";
      } else if (!searchBar.value) {
        clearIcon.style.visibility = "hidden";
      }
    });

    clearIcon.addEventListener("click", () => {
      searchBar.value = "";
      clearIcon.style.visibility = "hidden";
    });
  }

}
