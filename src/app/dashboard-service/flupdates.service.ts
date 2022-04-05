import { Injectable } from '@angular/core';
import { waterLevelPostInterface } from '../WaterLevelPost-Interface';
import { monthlyInterface } from '../montly-Interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FlupdatesService {
  private flupdatesUrl = 'http://localhost:5000/flwaterlevelpost'; //JSON Server

  constructor(private http: HttpClient) {}

  getFLUpdatesFromService(): Observable<waterLevelPostInterface[]> {
    return this.http.get<waterLevelPostInterface[]>(this.flupdatesUrl);
  }
}
