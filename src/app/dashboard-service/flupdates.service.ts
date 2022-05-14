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
  // private flupdatesUrl =
  //   'https://floodwatchbackend.herokuapp.com/flwaterlevelpost'; //Springboot Heroku Server Try
  //private flWaterLevelPost = 'http://localhost:8080/flwaterlevelpost'; //undeployed springboot
  private flWaterLevelPost =
    'https://floodwatch-software-backend.herokuapp.com/flwaterlevelpost'; //EEPLOYED springboot

  constructor(private http: HttpClient) {}

  //json server || deployed BE but from personal repo (must change)
  // getFLUpdatesFromService(): Observable<waterLevelPostInterface[]> {
  //   return this.http.get<waterLevelPostInterface[]>(this.flupdatesUrl);
  // }

  //From undeployed springboot BE
  getFLUpdatesFromService(): Observable<waterLevelPostInterface[]> {
    return this.http.get<waterLevelPostInterface[]>(this.flWaterLevelPost);
  }
}
