import { Injectable } from '@angular/core';
import { postInterface } from '../mock-post-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postUrl = 'http://localhost:5000/post';
  constructor(private http: HttpClient) {}

  //getPost
  getPostFromPostService(): Observable<postInterface[]> {
    return this.http.get<postInterface[]>(this.postUrl);
  }

  addPostFromPostService(postAdded: postInterface): Observable<postInterface> {
    return this.http.post<postInterface>(this.postUrl, postAdded, httpOptions);
  }
}
