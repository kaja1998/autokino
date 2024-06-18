import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {response} from "express";

@Injectable({
  providedIn: 'root'
})
export class LoginAuthenticationService {
  isUserLoggedIn: boolean = false;
  public currentUser: any = {}; // Platzhalter für Benutzerdaten

  constructor(private http: HttpClient) { }

  login(mail: string, passwort: string): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>('http://127.0.0.1:8080/loginaut', { mail, passwort }).subscribe(
          (response: any) => {
            if (response.success) {
              this.isUserLoggedIn = true;
              this.currentUser = response.user; // Benutzerdaten setzen
              localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");
              localStorage.setItem('user', this.currentUser);
              localStorage.setItem('userVorname', this.currentUser.vorname);
              observer.next(response); // Weiterleiten der erfolgreichen Antwort
            } else {
              observer.error(response.message);
            }
            observer.complete();
          },
          (error) => {
            observer.error(error);
            observer.complete();
          }
      );
    });
  }

}