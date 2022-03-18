import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'https://localhost:44349/api/User';// what should i give here?

  constructor(private http: HttpClient) { }

  getUserById(id:number): Observable<User> {
    return this.http.get<User>(this.usersUrl+'/'+id);
  }

  updateUser(user: User): Observable<User>{
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put<User>(this.usersUrl, user, httpOptions);
  }
}
