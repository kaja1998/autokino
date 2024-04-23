import { Component } from '@angular/core';  //Importiere die Component-Dekorator-Funktion

//Dekoriere bzw. markiert die Header-Klasse mit der Component-Dekorator-Funktion
//Hier teilt diese der HeaderComponent Klasse mit, dass sie eine Angular-Komponente ist und gibt die Meta-Daten an
@Component({
  standalone: true,
  selector: "app-header",                 //Referenz auf die HTML-Datei
  templateUrl: "header.component.html",   //Aussehen der Komponente wird hier definiert
  styleUrls: ['header.component.css']     //Style-Datei, die auf diese Komponente angewendet werden soll
})

//Quasi die main class der Komponente
export class HeaderComponent {

}
