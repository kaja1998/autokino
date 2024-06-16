import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegistrierenService {

  constructor(private http: HttpClient) { }

  public checkEmailExists(mail: string): Observable<any> {
    return this.http.post('http://127.0.0.1:8080/loginaut', { mail});
  }

}
