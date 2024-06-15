import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FilmServiceService } from '../providers/film-service.service';
import { CommonModule } from '@angular/common';

function getUserInput(): void {
  // Lese den Wert des Eingabefelds aus
  const searchInputElement = document.getElementById('search') as HTMLInputElement;
  const userInput: string = searchInputElement.value;

  // Gebe den Wert in der Konsole aus
  console.log('User Input:', userInput);
}

@Component({
  selector: 'app-programm',
  standalone: true,
  providers: [FilmServiceService],
  imports: [RouterOutlet, RouterLink, DatePipe, CommonModule],
  templateUrl: './programm.component.html',
  styleUrl: './programm.component.css'
})

export class ProgrammComponent implements OnInit {

  datum1 = new Date(2024,1,9);

  constructor(public filmService: FilmServiceService) {
    filmService.getFilme().subscribe(data => {
      console.log(filmService.filme);
    });
  }

  ngOnInit(): void {
    const clearIcon = document.querySelector(".clear-icon") as HTMLElement;
    const searchBar = document.getElementById("search") as HTMLInputElement;
    const searchIcon = document.querySelector(".search-icon")as HTMLInputElement;

    searchBar.addEventListener("keyup", () => {
      if (searchBar.value && clearIcon.style.visibility != "visible") {
        clearIcon.style.visibility = "visible";
      } else if (!searchBar.value) {
        clearIcon.style.visibility = "hidden";
      }
    });

    searchIcon.addEventListener("click",() =>{
      getUserInput();
    })

    clearIcon.addEventListener("click", () => {
      searchBar.value = "";
      clearIcon.style.visibility = "hidden";
    });
  }

}
