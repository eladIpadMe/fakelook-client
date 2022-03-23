import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  
  getAllUsers(): Observable<User[]>{
    const headers = this.headers;
    return this.http.get<User[]>(this.usersUrl, {headers});
  }
  getUserById(id:number): Observable<User> {
    const headers = this.headers;
    return this.http.get<User>(this.usersUrl+'/'+id, {headers});
  }

  updateUser(user: User): void{
    const headers = this.headers;
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    this.http.put<User>(this.usersUrl, user, httpOptions).subscribe((res) => {
    },
    (error) => console.log(error)
    ); 
  }

  getUserIdByUserName(userName: String): Observable<number> {
    const headers = this.headers;
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.get<number>(this.usersUrl+ '/GetUserIdByUserName?userName=' + userName)
 
  }
}
