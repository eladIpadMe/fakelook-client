import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';
// import { Post } from '../models/post.model';


@Injectable()
export class PostsService implements OnDestroy {
  private url= environment.url;
  private postsSubject: Subject<Post[]> = new Subject();

  private subs: Subscription[] = [];
  constructor(private http: HttpClient) {}
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
  
  // getPostsWithDeleted(): Observable<Post[]> {
  //   this.subs.push(
  //     this.http
  //       .get<Post[]>(this.url)
  //       .subscribe((res) => this.postsSubject.next(res))
  //   );
  //   return this.postsSubject.asObservable();
  // }

  getPosts(): Observable<Post[]> {
    const currentUrl = `${this.url}Post`;
    return this.http.get<Post[]>(currentUrl)
  }

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
}
