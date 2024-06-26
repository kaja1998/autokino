import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class KundendatenService {

  constructor(private http: HttpClient) {
  }

  updateKundendaten(user: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8080/updatekundendaten', user);
  }

  deleteKunde(id: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8080/deletekunde', { id });
  }

}
