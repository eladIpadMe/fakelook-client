import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
 headers?: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    });
   }

  private url= environment.url;

  createPost(post: Post): void {

    const currentUrl = `${this.url}Post/Post`;

    const headers = this.headers;
      this.http.post<Post>(currentUrl, post, {headers}).subscribe((res) => {
        //this.router.navigateByUrl('/Stam');
        console.log(post);
        console.log("New post entered!");
        console.log(res);
      },
      (error) => console.log(error)
      );
  }

  getPosts(): Observable<Post[]>{
    //const currentUrl = `${this.url}Secret/`;  

  const headers = this.headers;
    return this.http.get<Post[]>(`${this.url}Post`, {headers}).pipe(
      map((res) => res));
      //catchError((err) => of({msg: 'Your session has expired. Please register again'})));
  }

  ///////check!!!////////
  // updatePost(post: Post){
  //   this.http.put<Post>(`${this.url}Post/${post.id}`, post);
  // }
}
