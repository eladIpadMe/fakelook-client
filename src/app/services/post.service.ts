import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Like } from '../models/like.model';
import { Post } from '../models/post.model';
import { PostsFilter } from '../models/postsfilter.model';

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
  private postsSubject = new BehaviorSubject<Post[]>([]);
  private url= environment.url;
  private subs: Subscription[] = [];
  private post1: Post[] = [];
  createPost(post: Post): void {

    const currentUrl = `${this.url}Post/Post`;

    const headers = this.headers;
      this.http.post<Post>(currentUrl, post, {headers}).subscribe((res) => {
        console.log(post);
        console.log("New post entered!");
        console.log(res);
      },
      (error) => console.log(error)
      );
  }
  getPosts(): Observable<Post[]> {
    const currentUrl = `${this.url}Post`;
    const headers = this.headers;
    this.subs.push(
      this.http
        .get<Post[]>(`${this.url}Post`, {headers})
        .subscribe((res) => this.postsSubject.next(res)));
    return this.postsSubject;
  }
  manageLike(userId: number, postId: number){
    const headers = this.headers;
    let like: Like = {userId:userId, postId:postId};
    this.http.post(`${this.url}Post/ManageLike`, like)
    .subscribe((res)=> console.log("new like entered!"),
    (error) => console.log(error)
    );
  }
  deletePost(id: string): void {
    const currentUrl = `${this.url}Post/Delete`;

    this.http.delete<any>(currentUrl + "/" + id).subscribe((res) => {
      console.log("post " + id + "been deleted");
      console.log(res);
    },
    (error) => console.log(error)
    );
  }

  filterPosts(postFilter: PostsFilter){
    const currentUrl = `${this.url}Post/Filter`;
    this.subs.push(this.http.post<Post[]>(currentUrl, postFilter,{headers:this.headers}).subscribe((res)=>{
      this.postsSubject.next([...res]);            
    }))
  }
}
