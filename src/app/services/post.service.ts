import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, Subscription } from 'rxjs';
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

  private url= environment.url;
  private subs: Subscription[] = [];
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
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

  // getPosts(): Observable<Post[]>{
  //   const currentUrl = `${this.url}Secret/`;  

  // const headers = this.headers;
  //   return this.http.get<Post[]>(`${this.url}Post`, {headers}).pipe(
  //     map((res) => res));
  //     catchError((err) => of({msg: 'Your session has expired. Please register again'})));
  // }

  getPosts(): Observable<Post[]> {
    const currentUrl = `${this.url}Post`;
    return this.http.get<Post[]>(currentUrl)
  }


  manageLike(userId: number, postId: number){
    const headers = this.headers;
    let like: Like = {userId:userId, postId:postId};
    this.http.post(`${this.url}Post/ManageLike`, like)
    .subscribe((res)=> console.log("new like entered!"),
    (error) => console.log(error)
    );
  }

  ///////check!!!////////
  // updatePost(post: Post){
  //   this.http.put<Post>(`${this.url}Post/${post.id}`, post);
  // }
  deletePost(id: string): void {
    const currentUrl = `${this.url}Post/Delete`;

    this.http.delete<any>(currentUrl + "/" + id).subscribe((res) => {
      //this.router.navigateByUrl('/Stam');
      console.log("post " + id + "been deleted");
      console.log(res);
    },
    (error) => console.log(error)
    );
   
  }

  filterPosts(postFilter: PostsFilter): Observable<Post[]>{
    const currentUrl = `${this.url}Post/Filter`;
    return this.http.post<Post[]>(currentUrl, postFilter);
  }
}
