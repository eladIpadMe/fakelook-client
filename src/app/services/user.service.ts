import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import IUser from '../interfaces/userInterface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'https://localhost:44349/api/User';// what should i give here?

  constructor(private http: HttpClient) { }

  getUserById(id:number): Observable<IUser> {
    return this.http.get<IUser>(this.usersUrl+'/'+id);
  }

  updateUser(user: IUser): Observable<IUser>{
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put<IUser>(this.usersUrl, user, httpOptions);
  }
}
