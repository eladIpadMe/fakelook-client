import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  private url= environment.url;

  createPost(post: any): void {

    const currentUrl = `${this.url}Post/Post`;
   
      this.http.post<any>(currentUrl, post).subscribe((res) => {
        //this.router.navigateByUrl('/Stam');
        console.log(post);
        console.log("New post entered!");
        console.log(res);
      },
      (error) => console.log(error)
      );
  }

  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(`${this.url}Post`);
  }
}
