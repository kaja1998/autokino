import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class KundendatenService {

  kunden: Array<any> = [];

  constructor(private http: HttpClient) { }

  public getKundendaten() {
    return new Observable(observer => {
      this.http.get('http://127.0.0.1:8080/kundendaten').subscribe((data: any) => {
        this.kunden = data;
        observer.next()
        observer.complete()
      }, err => {
        observer.error()
        observer.complete()
      })
    })
  }
}
