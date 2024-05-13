import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-programm',
  standalone: true,
  imports: [],
  templateUrl: './programm.component.html',
  styleUrl: './programm.component.css'
})

export class ProgrammComponent implements OnInit {
  
  ngOnInit(): void {
    // Hier füge den JavaScript-Code ein

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
