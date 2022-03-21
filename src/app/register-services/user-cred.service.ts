import { Injectable } from '@angular/core';
import { userInterface } from '../user-interface';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userArray } from '../mock-user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class UserCredService {
  private userUrl = 'http://localhost:5000/user'; //from json-server
  private fluserUrl = 'http://localhost:8080/fluser'; //from spring-boot
  constructor(private http: HttpClient) { }

  //Using JSON Server - START
  getUserFromService(): Observable<userInterface[]> {
    return this.http.get<userInterface[]>(this.userUrl);
  }

  addUserFromService(user: userInterface): Observable<userInterface> {
    return this.http.post<userInterface>(this.userUrl, user, httpOptions);
  }
  //Using JSON Server - END

  // Using Spring boot as backend - START (WILL UNCOMMENT THIS ONCE WE'VE ELIMINATE JSON SERVER FROM THE SYSTEM HAHAHA)
  // getUserFromService(): Observable<userInterface[]> {
  //   return this.http.get<userInterface[]>(this.fluserUrl);
  // }

  // addUserFromService(user: userInterface): Observable<userInterface> {
  //   return this.http.post<userInterface>(this.fluserUrl, user, httpOptions);
  // }
  //Using Spring boot as backend - END
}
