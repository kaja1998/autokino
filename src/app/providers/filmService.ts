import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ProgrammComponent} from "../programm/programm.component";


@Injectable({
  providedIn: 'root',
})
export class FilmService {
  filme: Array<any> = [];
  certainFilme: Array<any> = [];
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

  public getCertainFilme(userInput: string): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>('http://127.0.0.1:8080/certainFilme', {userInput}).subscribe((data: any) => {
        this.certainFilme = data;
        observer.next()
        observer.complete()
      }, err => {
        observer.error()
        observer.complete()
      })
    })
  }

}
