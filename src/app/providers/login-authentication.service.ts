import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {response} from "express";

@Injectable({
  providedIn: 'root'
})
export class LoginAuthenticationService {
  private isUserLoggedInSubject = new BehaviorSubject<boolean>(false);
  isUserLoggedIn$ = this.isUserLoggedInSubject.asObservable();

  public currentUser: any = {}; // Platzhalter für Benutzerdaten

  constructor(private http: HttpClient) {  }

  login(mail: string, passwort: string): Observable<any> {
    return new Observable(observer => {
      // Simuliere eine erfolgreiche Antwort
      const response = {
        success: true,
        user: {
          mail: mail,
          passwort: passwort,
          // Füge hier zusätzliche Benutzerdaten hinzu, falls erforderlich
          id: 1, // Beispiel ID
          vorname: "Max",
          nachname: "Mustermann",
          strasseUndNr: "Musterstrasse 1",
          plz: 12345,
          stadt: "Musterstadt",
          geburtsdatum: "2000-01-01",
          zahlungsmittel: "Musterbank"
        }
      };

      this.isUserLoggedInSubject.next(true); // Aktualisierung des Observable
      console.log("BehaviorSubject:" + this.isUserLoggedInSubject.value) //Test: BehaviorSubject aktualisiert sich
      this.currentUser = response.user; // Benutzerdaten setzen
      localStorage.setItem('isUserLoggedIn', this.isUserLoggedInSubject.value ? "true" : "false");
      localStorage.setItem('user', JSON.stringify(this.currentUser)); // Benutzer als JSON in localStorage speichern

      observer.next(response); // Erfolgreiche Antwort weiterleiten
      observer.complete();
    });
  }

  // login(mail: string, passwort: string): Observable<any> {
  //   return new Observable(observer => {
  //     this.http.post<any>('http://127.0.0.1:8080/loginaut', { mail, passwort }).subscribe(
  //       (response: any) => {
  //         if (response.success) {
  //           this.isUserLoggedInSubject.next(true); // Aktualisierung des Observable
  //           this.currentUser = response.user; // Benutzerdaten setzen
  //           localStorage.setItem('isUserLoggedIn', this.isUserLoggedInSubject.value ? "true" : "false");
  //           localStorage.setItem('user', JSON.stringify(this.currentUser));   // Benutzer als JSON in localStorage speichern
  //           observer.next(response); // Erfolgreiche Antwort weiterleiten
  //         } else {
  //           observer.next(response); // Fehlermeldung weiterleiten
  //         }
  //         observer.complete();
  //       },
  //       (error) => {
  //         observer.error(error); // Netzwerkfehler oder andere Fehler behandeln
  //         observer.complete();
  //       }
  //     );
  //   });
  // }

  logout(): void {
    this.isUserLoggedInSubject.next(false);
    localStorage.removeItem('isUserLoggedIn');
    localStorage.removeItem('user');
  }

}
