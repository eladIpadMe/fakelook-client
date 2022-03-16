import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/shared/post.model';
// import { Post } from 'src/app/shared/models/post.model';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-posts-menu',
  templateUrl: './posts-menu.component.html',
  styleUrls: ['./posts-menu.component.scss'],
})
export class PostsMenuComponent implements OnInit {
  
  
  constructor(private postsService: PostsService) {}
  posts$!: Observable<Post[]>;
  ngOnInit(): void {
    this.posts$ = this.postsService.getPosts();
  }
  onNewPost(form: FormData): void {
    this.postsService.addPost(form);
  }
  onPostDelete(id: string): void {
    this.postsService.deletePost(id);
  }
}
