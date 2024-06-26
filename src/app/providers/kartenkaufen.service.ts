import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class KartenkaufenService {

  constructor(private http: HttpClient) { }

   public getticket(ticket_nr: number,kunden_id: number,veranstaltungs_nr: number,erwachsene: number,ermaessigte: number,kinder: number): Observable<any> {
     console.log(ticket_nr,kunden_id,veranstaltungs_nr,erwachsene,ermaessigte,kinder)
     return this.http.post<any>('http://127.0.0.1:8080/insertticket', {ticket_nr,kunden_id,veranstaltungs_nr,erwachsene,ermaessigte,kinder});
   }

}
