//verwendet, um die Hauptkomponenten und Module der Anwendung zu organisieren und zu konfigurieren
//Deklaration von Komponenten bewirkt, dass diese an anderen Stellen in der App verwendet werden können

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent } from './header/header.component';     //Importiere die HeaderComponent-Klasse

@NgModule({
  declarations: [
    // Deklariere die HeaderComponent-Klasse in diesem Modul
    HeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  exports: [
    HeaderComponent
  ],
  bootstrap: []
})

export class AppModule { }
