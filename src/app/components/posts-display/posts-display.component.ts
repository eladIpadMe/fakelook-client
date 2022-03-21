import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-posts-display',
  templateUrl: './posts-display.component.html',
  styleUrls: ['./posts-display.component.scss'],
})
export class PostsDisplayComponent implements OnInit {
  constructor() {}
  @Input() posts: Post[] | undefined;
  @Output() postDeleteEventEmitter = new EventEmitter<string>();
  ngOnInit(): void {
  }
  deletePost(post: Post): void {
    this.postDeleteEventEmitter.emit(post.id);
  }
}
