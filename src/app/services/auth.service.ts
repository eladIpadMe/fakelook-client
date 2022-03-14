import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, combineLatest, map, Observable, of, Subscription } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private url = 'https://localhost:44345/api/';
  subs: Subscription[] = [];
  constructor(private http: HttpClient, private router: Router) {}
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
  signUp(user: User): void {
    const currentUrl = `${this.url}Auth/SignUp`;
    this.subs.push(
      this.http.post<any>(currentUrl, user).subscribe((res) => {
        this.setToken(res.token);
        this.router.navigateByUrl('/Stam');
      })
    );
  }
  login(user: User): void {
    const currentUrl = `${this.url}Auth/Login`;
    this.subs.push(
      this.http.post<any>(currentUrl, user).subscribe((res) => {
        this.setToken(res.token);
        this.router.navigateByUrl('/Stam');
      })
    );
  }
  checkAccess(): Observable<boolean> {
    const currentUrl = `${this.url}Auth/TestAll`;

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getToken(),
    });
    return this.http.get(currentUrl, { headers }).pipe(
      map((_) => true),
      catchError((_) => of(false))
    );
  }
  secret(): Observable<any> {
    const currentUrl = `${this.url}Secret/`;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.getToken(),
    });
    const all$ = this.http.get<any>(currentUrl + 'All');
    const auth$ = this.http
      .get<any>(currentUrl + 'Authenticated', { headers })
      .pipe(catchError((err) => of({ msg: 'you are not authenticated' })));
    const admin$ = this.http
      .get<any>(currentUrl + 'Admin', { headers })
      .pipe(catchError((err) => of({ msg: 'you are not admin' })));
    return combineLatest(all$, auth$, admin$).pipe(map((res) => ({ ...res })));
  }
  private getToken(): string | null {
    return sessionStorage.getItem('token');
  }
  private setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }
}
