import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  addComment(comment: Comment){
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    });
    const url = `${environment.url}Comment`;
    this.http.post<Comment>(url, comment, {headers}).subscribe((res)=>{
      console.log(res);
      console.log("new comment entered!");
      },
      (error) => console.log(error));
  }
}
