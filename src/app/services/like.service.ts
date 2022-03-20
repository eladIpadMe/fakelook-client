import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Like } from '../models/like.model';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  constructor(private http: HttpClient) {}
  private url= environment.url;
  
  createLike(like: Like){
    const currentUrl = `${this.url}Like`;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    });
    this.http.post<Like>(currentUrl, like, {headers}).subscribe((res) => {
      //this.router.navigateByUrl('/Stam');
      console.log(like);
      console.log("New like entered!");
      console.log(res);
    },
    (error) => console.log(error)
    );
  }

  // getLike(like: Like){

  // }
}
