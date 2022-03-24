import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
// import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-posts-menu',
  templateUrl: './posts-menu.component.html',
  styleUrls: ['./posts-menu.component.scss'],
})
export class PostsMenuComponent implements OnInit {
  
  
  constructor(private postService: PostService) {}
  posts: Post[] = [];

  ngOnInit(): void {
  }
  onNewPost(post: Post): void {
    this.postService.createPost(post);
  }
  onPostDelete(id: number): void {
    this.postService.deletePost(id);
  }
}
