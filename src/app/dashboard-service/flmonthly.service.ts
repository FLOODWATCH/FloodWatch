import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { monthlyInterface } from '../montly-Interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class FlmonthlyService {
  private diagramApiUrl = 'http://localhost:5000/flmonthly';
  constructor(private http: HttpClient) {}

  //GET from service
  getDiagramFromService(): Observable<monthlyInterface[]> {
    return this.http.get<monthlyInterface[]>(this.diagramApiUrl);
  }

  //POST from service (this method is futile lol)
  addDiagramFromService(
    diagramAdded: monthlyInterface
  ): Observable<monthlyInterface> {
    return this.http.post<monthlyInterface>(
      this.diagramApiUrl,
      diagramAdded,
      httpOptions
    );
  }
}
