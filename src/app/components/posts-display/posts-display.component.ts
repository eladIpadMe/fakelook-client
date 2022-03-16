import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/shared/post.model';

@Component({
  selector: 'app-posts-display',
  templateUrl: './posts-display.component.html',
  styleUrls: ['./posts-display.component.scss'],
})
export class PostsDisplayComponent implements OnInit {
  constructor() {}
  @Input() posts$!: Observable<Post[]>;
  @Output() postDeleteEventEmitter = new EventEmitter<string>();
  ngOnInit(): void {
  }
  deletePost(id: string): void {
    this.postDeleteEventEmitter.emit(id);
  }
}
