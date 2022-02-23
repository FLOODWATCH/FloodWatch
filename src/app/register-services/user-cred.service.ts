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
  private userUrl = 'http://localhost:5000/user';
  constructor(private http: HttpClient) {}

  getUserFromService(): Observable<userInterface[]> {
    return this.http.get<userInterface[]>(this.userUrl);
  }

  addUserFromService(user: userInterface): Observable<userInterface> {
    return this.http.post<userInterface>(this.userUrl, user, httpOptions);
  }
}
