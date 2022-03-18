import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Post } from '../shared/post.model';
// import { Post } from '../models/post.model';


@Injectable()
export class PostsService implements OnDestroy {
  private url1= environment.url;
  private url = 'https://localhost:44324/api/Posts/';
  private postsSubject: Subject<Post[]> = new Subject();

  private subs: Subscription[] = [];
  constructor(private http: HttpClient) {}
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
  getPosts(): Observable<Post[]> {
    this.subs.push(
      this.http
        .get<Post[]>(this.url)
        .subscribe((res) => this.postsSubject.next(res))
    );
    return this.postsSubject.asObservable().pipe(
      map((posts) => {
        return posts.filter((post) => post.isShow);
      })
    );
  }
  getPostsWithDeleted(): Observable<Post[]> {
    this.subs.push(
      this.http
        .get<Post[]>(this.url)
        .subscribe((res) => this.postsSubject.next(res))
    );
    return this.postsSubject.asObservable();
  }
  deletePost(id: string): void {
    this.subs.push(
      this.http
        .delete<Post[]>(this.url + id)
        .subscribe((res) => this.postsSubject.next(res))
    );
  }
  

  createPost(post: any): void {

    const currentUrl = `${this.url1}Post/Post`;
   
      this.http.post<any>(currentUrl, post).subscribe((res) => {
        //this.router.navigateByUrl('/Stam');
        console.log(post);
        console.log("New post entered!");
        console.log(res);
      },
      (error) => console.log(error)
      );
  }
}