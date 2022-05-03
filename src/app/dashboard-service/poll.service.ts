import { Injectable } from '@angular/core';
import { pollInterface } from '../poll-interface';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PipeCollector } from '@angular/compiler/src/template_parser/binding_parser';
import { votersInterface } from '../voters-interface';

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
  private votersUrl = 'http://localhost:5000/voters';
  constructor(private http: HttpClient) {}

  //POLL request

  getPollsFromService(): Observable<pollInterface[]> {
    return this.http.get<pollInterface[]>(this.pollUrl);
  }

  addVoteFromService(vote: pollInterface): Observable<pollInterface> {
    return this.http.post<pollInterface>(this.pollUrl, vote, httpOptions);
  }

  //update poll
  goVotePollFromService(vote: pollInterface): Observable<pollInterface> {
    const voteUrl = `${this.pollUrl}/${vote.id}`;
    return this.http.put<pollInterface>(voteUrl, vote, httpOptions);
  }

  //VOTERS request
  getVotersFromService(): Observable<votersInterface[]> {
    return this.http.get<votersInterface[]>(this.votersUrl);
  }
  addVotersFromService(voter: votersInterface): Observable<votersInterface> {
    return this.http.post<votersInterface>(this.votersUrl, voter, httpOptions);
  }
  updateVoteFromService(vote: votersInterface): Observable<votersInterface> {
    const votersUrl = `${this.votersUrl}/${vote.id}`;
    return this.http.put<votersInterface>(votersUrl, vote, httpOptions);
  }
}
