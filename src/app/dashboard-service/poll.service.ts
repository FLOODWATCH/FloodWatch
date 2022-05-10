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
  private pollUrl = 'http://localhost:5000/poll'; //JSON SERVER
  private votersUrl = 'http://localhost:5000/voters'; //JSON SERVER

  private FLpollUrl = 'http://localhost:8080/flpoll'; // SPRINGBOOT
  private FLvotersUrl = 'http://localhost:8080/flvoters'; //SPRINGBOOT
  constructor(private http: HttpClient) {}

  //JSON SERVER BELOW

  // POLL request
  // getPollsFromService(): Observable<pollInterface[]> {
  //   return this.http.get<pollInterface[]>(this.pollUrl);
  // }

  // addVoteFromService(vote: pollInterface): Observable<pollInterface> {
  //   return this.http.post<pollInterface>(this.pollUrl, vote, httpOptions);
  // }

  // //update poll
  // goVotePollFromService(vote: pollInterface): Observable<pollInterface> {
  //   const voteUrl = `${this.pollUrl}/${vote.id}`;
  //   return this.http.put<pollInterface>(voteUrl, vote, httpOptions);
  // }

  // //VOTERS request
  // getVotersFromService(): Observable<votersInterface[]> {
  //   return this.http.get<votersInterface[]>(this.votersUrl);
  // }
  // addVotersFromService(voter: votersInterface): Observable<votersInterface> {
  //   return this.http.post<votersInterface>(this.votersUrl, voter, httpOptions);
  // }
  // updateVoteFromService(vote: votersInterface): Observable<votersInterface> {
  //   const votersUrl = `${this.votersUrl}/${vote.id}`;
  //   return this.http.put<votersInterface>(votersUrl, vote, httpOptions);
  // }

  //SPRINGBOOT BELOW

  //POLL request
  getPollsFromService(): Observable<pollInterface[]> {
    return this.http.get<pollInterface[]>(this.FLpollUrl);
  }

  addVoteFromService(vote: pollInterface): Observable<pollInterface> {
    return this.http.post<pollInterface>(this.FLpollUrl, vote, httpOptions);
  }

  //update poll
  // goVotePollFromService(vote: pollInterface): Observable<pollInterface> {
  //   const voteUrl = `${this.FLpollUrl}/${vote.id}`;
  //   return this.http.put<pollInterface>(voteUrl, vote, httpOptions);
  // }
  //---------------------------------------------------------------
  goVotePollFromService(vote: pollInterface): Observable<pollInterface> {
    const voteUrl = `${this.FLpollUrl}/${vote.id}?${'pollSafeVote'}=${
      vote.pollSafeVote
    }&${'pollNotSafeVote'}=${vote.pollNotSafeVote}&${'pollNoVote'}=${
      vote.pollNoVote
    }&${'pollTotalVoters'}=${vote.pollTotalVoters}`;
    return this.http.put<pollInterface>(voteUrl, vote, httpOptions);
  }
  //---------------------------------------------------------------

  //VOTERS request
  getVotersFromService(): Observable<votersInterface[]> {
    return this.http.get<votersInterface[]>(this.FLvotersUrl);
  }
  addVotersFromService(voter: votersInterface): Observable<votersInterface> {
    return this.http.post<votersInterface>(
      this.FLvotersUrl,
      voter,
      httpOptions
    );
  }
  updateVoteFromService(vote: votersInterface): Observable<votersInterface> {
    const votersUrl = `${this.FLvotersUrl}/${vote.id}`;
    return this.http.put<votersInterface>(votersUrl, vote, httpOptions);
  }
}
