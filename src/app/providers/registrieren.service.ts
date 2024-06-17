import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegistrierenService {

  constructor(private http: HttpClient) { }

    public checkEmailExists(email: string): Observable<any> {
        return new Observable(observer => {
            this.http.post('http://127.0.0.1:8080/checkEmailExists', { email }).subscribe(
                (response: any) => {
                    observer.next(response);
                    observer.complete();
                },
                (error) => {
                    observer.error(error);
                    observer.complete();
                }
            );
        });
    }

  public registerCustomer(customer: any): Observable<any> {
      return new Observable(observer => {
          this.http.post('http://127.0.0.1:8080/registerCustomer', customer).subscribe(
              (registerResponse: any) => {
                  observer.next(registerResponse);
                  observer.complete();
              },
              (error) => {
                  observer.error(error);
                  observer.complete();
              }
          );
      });
  }
}
