import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';
import { environment } from './../environments/environment'

const path = environment.apiUrl + 'files/';
@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private http: HttpClient) { }

  public upload(file:File){
    return this.http.post<File>(path, file,{
      reportProgress: true,
      observe: 'events'
    })
  }
}
