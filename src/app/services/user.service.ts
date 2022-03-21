import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'https://localhost:44349/api/User';// what should i give here?
  headers?: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    });
   }

  getUserById(id:number): Observable<User> {
    const headers = this.headers;
    return this.http.get<User>(this.usersUrl+'/'+id, {headers});
  }

  updateUser(user: User): Observable<User>{
    const headers = this.headers;
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put<User>(this.usersUrl, user, httpOptions);
  }
}
