import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FilmService } from '../providers/film.service';
import { CommonModule } from '@angular/common';

function getUserInput(): string {
  const searchInputElement = document.querySelector('.search') as HTMLInputElement;
  const userInput: string = searchInputElement.value;
  return userInput;
}

@Component({
  selector: 'app-programm',
  standalone: true,
  providers: [FilmService],
  imports: [RouterOutlet, RouterLink, DatePipe, CommonModule],
  templateUrl: './programm.component.html',
  styleUrl: './programm.component.css'
})

export class ProgrammComponent implements OnInit {

  datum1 = new Date(2024,1,9);

  constructor(public filmService: FilmService) {
    // filmService.getFilme().subscribe(data => {
    // });
    // filmService.getCertainFilme(getUserInput()).subscribe( data => {
    //   // if(filmService.certainFilme != null){
    //   //   console.log(filmService.certainFilme);
    //   // }
    // });
  }

  ngOnInit(): void {
    const clearIcon = document.querySelector(".clear-icon") as HTMLElement;
    const searchBar = document.querySelector(".search") as HTMLInputElement;
    const searchIcon = document.querySelector(".search-icon")as HTMLInputElement;

    searchBar.addEventListener("keyup", () => {
      if (searchBar.value && clearIcon.style.visibility != "visible") {
        clearIcon.style.visibility = "visible";
      } else if (!searchBar.value) {
        clearIcon.style.visibility = "hidden";
      }
    });

    searchIcon.addEventListener("click",() =>{
      let userInput = getUserInput();
    })

    clearIcon.addEventListener("click", () => {
      searchBar.value = "";
      clearIcon.style.visibility = "hidden";
    });
  }

}
