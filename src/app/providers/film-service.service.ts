import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilmServiceService {
  filme: Array<any> = [];
  filmBeschreibung: String = "";
  constructor(private http: HttpClient) { }

  public getFilme() {
    return new Observable(observer => {
      this.http.get('http://127.0.0.1:8080/filme').subscribe((data: any) => {
        this.filme = data;
        observer.next()
        observer.complete()
      }, err => {
        observer.error()
        observer.complete()
      })
    })
  }


  public getFilmBeschreibung() {
    return new Observable(observer => {
      this.http.get('http://127.0.0.1:8080/filmBeschreibung').subscribe((data: any) => {
        this.filmBeschreibung = data;
        observer.next()
        observer.complete()
      }, err => {
        observer.error()
        observer.complete()
      })
    })
  }
}
