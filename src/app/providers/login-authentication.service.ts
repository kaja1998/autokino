import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginAuthenticationService {
  private loggedIn = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  public login(mail: string, passwort: string): Observable<any> {
    return this.http.post('http://127.0.0.1:8080/loginaut', { mail, passwort });
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
