import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../user/user";

@Injectable({
  providedIn: 'root'
})

export class LoginAuthenticationService {
  private isUserLoggedInSubject = new BehaviorSubject<boolean>(false);
  isUserLoggedIn$ = this.isUserLoggedInSubject.asObservable();

  private currentUser: User | null = null;

  constructor(private http: HttpClient) {  }

  login(mail: string, passwort: string): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>('http://127.0.0.1:8080/loginaut', { mail, passwort }).subscribe(
        (response: any) => {
          if (response.success) {
            this.isUserLoggedInSubject.next(true); // Aktualisierung des Observable
            this.currentUser = response.user; // Benutzerdaten setzen
            this.setCurrentUser(response.user);
            observer.next(response); // Erfolgreiche Antwort weiterleiten
          } else {
            observer.next(response); // Fehlermeldung weiterleiten
          }
          observer.complete();
        },
        (error) => {
          observer.error(error); // Netzwerkfehler oder andere Fehler behandeln
          observer.complete();
        }
      );
    });
  }

  logout(): void {
    this.isUserLoggedInSubject.next(false);
    this.setCurrentUser(null); // Benutzerdaten zurücksetzen
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  setCurrentUser(user: User | null): void {
    this.currentUser = user;
  }
}
