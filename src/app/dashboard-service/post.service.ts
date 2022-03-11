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
  private postUrl = 'http://localhost:5000/post'; //from json-server
  private flpostUrl = 'http://localhost:8080/flpost'; //from spring boot

  constructor(private http: HttpClient) {}

  getPost;
  getPostFromPostService(): Observable<postInterface[]> {
    return this.http.get<postInterface[]>(this.postUrl);
  }

  addPostFromPostService(postAdded: postInterface): Observable<postInterface> {
    return this.http.post<postInterface>(this.postUrl, postAdded, httpOptions);
  }

  deletePostFromPostService(
    postDeleted: postInterface
  ): Observable<postInterface> {
    const deleteUrl = `${this.postUrl}/${postDeleted.id}`;
    return this.http.delete<postInterface>(deleteUrl);
  }

  //Using Spring boot as backend - START (WILL UNCOMMENT THIS ONCE WE'VE ELIMINATE JSON SERVER FROM THE SYSTEM HAHAHA)
  // getPostFromPostService(): Observable<postInterface[]> {
  //   return this.http.get<postInterface[]>(this.flpostUrl);
  // }

  // addPostFromPostService(postAdded: postInterface): Observable<postInterface> {
  //   return this.http.post<postInterface>(
  //     this.flpostUrl,
  //     postAdded,
  //     httpOptions
  //   );
  // }
  //Using Spring boot as backend - END
}
