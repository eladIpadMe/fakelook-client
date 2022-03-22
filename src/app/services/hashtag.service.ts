import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tag } from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class HashtagService {
  //private url= `${environment.url}Tag`;
  headers?: HttpHeaders;
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    });
   }

   getAllTags(): Observable<Tag[]>{
    
  const url= `${environment.url}Tag`;
  const headers = this.headers;
  return this.http.get<Tag[]>(url, {headers});

  } 
}

  


