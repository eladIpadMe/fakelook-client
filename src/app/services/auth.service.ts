import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, combineLatest, map, Observable, of, Subscription } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private url = 'https://localhost:44349/api/';
  subs: Subscription[] = [];
  constructor(private http: HttpClient, private router: Router) {}
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
  signUp(user: User): void {
    const currentUrl = `${this.url}Auth/SignUp`;
    this.subs.push(
      this.http.post<any>(currentUrl, user).subscribe((res) => {
        console.log("signedup");
        this.setToken(res.token, res.userId);
        this.router.navigateByUrl('/Main-page');
      },
      (error) => console.log("Couldent sign up"))
    );
  }
  login(user: User): void {
    const currentUrl = `${this.url}Auth/Login`;// shows which controler and which function in it
    this.subs.push(
      this.http.post<any>(currentUrl, user).subscribe((res) => {
        this.setToken(res.token, res.userId);
        console.log(res);
        this.router.navigateByUrl('/Main-page');
      },
      (error) => alert("Invalid"))
    );
  }
  checkAccess(): Observable<boolean> {
    let token = this.getToken();
    const currentUrl = `${this.url}Auth/TestAll`;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.http.get(currentUrl, { headers }).pipe(
      map((_) => true),
      catchError((_) => of(false))
    );
  }
 
  private getToken(): string | null {
    return sessionStorage.getItem('token');
  }
  private setToken(token: string, userId: string): void {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('id', userId);
  }
}
