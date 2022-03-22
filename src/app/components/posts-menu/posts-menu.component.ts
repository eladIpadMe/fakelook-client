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
  
  
  constructor(private postsService: PostService) {}
  posts: Post[] = [];

  ngOnInit(): void {
    this.postsService.getPosts().subscribe(
      (posts) => (this.posts = posts),
      (error) => console.log(error)
    );
  }
  onNewPost(post: Post): void {
    this.postsService.createPost(post);
  }
  onPostDelete(id: string): void {
    this.postsService.deletePost(id);
  }
}
