import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  filme: Array<any> = [];
  certainFilme: Array<any> = [];
  filmDates: Array<any> = [];
  userInput: string = "";
  filmtitel: string = "";

  constructor(private http: HttpClient) { }

  public getFilmeMitDatum(): Observable<any> {
    return new Observable(observer => {
      this.http.get('http://127.0.0.1:8080/filmeMitDatum').subscribe((data: any) => {
        this.filme = data;
        observer.next(data);
        observer.complete();
      }, err => {
        observer.error(err);
        observer.complete();
      });
    });
  }

  public getCertainFilme(userInput: string): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>('http://127.0.0.1:8080/certainFilme', {userInput}).subscribe((data: any) => {
        this.certainFilme = data;
        this.userInput = userInput;
        observer.next()
        observer.complete()
      }, err => {
        observer.error()
        observer.complete()
      })
    })
  }

  public getFilmDates(filmtitel: string): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>('http://127.0.0.1:8080/filmDates', {filmtitel}).subscribe((data: any) => {
        this.filmDates = data;
        this.filmtitel = filmtitel; 
        observer.next()
        observer.complete()
      }, err => {
        observer.error
        observer.complete()
      })
    })
  }
}
