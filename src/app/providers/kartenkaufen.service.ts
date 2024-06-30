import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class KartenkaufenService {
  tickets: Array<any> = [];
  constructor(private http: HttpClient) { }

   public setticket(ticket_nr: string,kunden_id: number,veranstaltungs_nr: number,erwachsene: number,ermaessigte: number,kinder: number): Observable<any> {
     console.log(ticket_nr,kunden_id,veranstaltungs_nr,erwachsene,ermaessigte,kinder)
     return this.http.post<any>('http://127.0.0.1:8080/insertticket', {ticket_nr,kunden_id,veranstaltungs_nr,erwachsene,ermaessigte,kinder});
   }


   public getticket(): Observable<any> {
    return new Observable(observer => {
      this.http.get('http://127.0.0.1:8080/loadticket').subscribe((data: any) => {
        this.tickets = data;
        observer.next(data);
        observer.complete();
      }, err => {
        observer.error(err);
        observer.complete();
      });
    });
  }
}