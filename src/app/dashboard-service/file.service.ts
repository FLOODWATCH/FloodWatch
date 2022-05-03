import { getLocaleDateFormat } from '@angular/common';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private server = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // define function to upload files
  uploadFile(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.server}/flfile/upload`,
      formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  // define function to download files
  // No need to pass string[] when returning BLob
  downloadFile(filename: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.server}/file/download/${filename}}`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    })
  }
  getData(id: number): Observable<any> {
    return this.http.get(`${this.server}/flfile/upload/${id}`,

    );
  }

}
