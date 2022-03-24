import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Like } from '../models/like.model';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  header?: HttpHeaders;
  
  private url= environment.url;
  currentUrl = `${this.url}Like`;
  likes: Like[] = [];
  constructor(private http: HttpClient) {
    this.header = new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    });
  }
  
  createLike(like: Like){
    const headers = this.header;
    this.http.post<Like>(this.currentUrl, like, {headers}).subscribe((res) => {
      console.log(like);
      console.log("New like entered!");
      console.log(res);
    },
    (error) => console.log(error)
    );
  }
}
