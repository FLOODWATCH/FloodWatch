import { Injectable } from '@angular/core';
import { pollInterface } from '../poll-interface';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PipeCollector } from '@angular/compiler/src/template_parser/binding_parser';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class PollService {
  private pollUrl = 'http://localhost:5000/poll';
  constructor(private http: HttpClient) {}

  getPollsFromService(): Observable<pollInterface[]> {
    return this.http.get<pollInterface[]>(this.pollUrl);
  }

  addVoteFromService(vote: pollInterface): Observable<pollInterface> {
    return this.http.post<pollInterface>(this.pollUrl, vote, httpOptions);
  }

  goVotePollFromService(vote: pollInterface): Observable<pollInterface> {
    const voteUrl = `${this.pollUrl}/${vote.id}`;
    return this.http.put<pollInterface>(voteUrl, vote, httpOptions);
  }
}
