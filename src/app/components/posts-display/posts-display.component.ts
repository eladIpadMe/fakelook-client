import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts-display',
  templateUrl: './posts-display.component.html',
  styleUrls: ['./posts-display.component.scss'],
})
export class PostsDisplayComponent implements OnInit {
  constructor(private postService: PostService) {}
  posts: Post[] = [];
  //@Input() posts$!: Observable<Post[]>;
  @Output() postDeleteEventEmitter = new EventEmitter<string>();
  
  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.postService.getPosts().subscribe((posts) =>{
      this.posts = posts;
      console.log(this.posts);
    },
    (error) => console.log(error))
  }

  deletePost(id: string): void {
    this.postDeleteEventEmitter.emit(id);
  }
}
