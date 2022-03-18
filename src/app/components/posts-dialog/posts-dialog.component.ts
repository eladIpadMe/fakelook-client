import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/shared/post.model';
// import { Post } from 'src/app/shared/models/post.model';

@Component({
  selector: 'app-posts-dialog',
  templateUrl: './posts-dialog.component.html',
  styleUrls: ['./posts-dialog.component.scss'],
})
export class PostsDialogComponent implements OnInit {
  @Input() posts!: Post;
  @Output() closeDialogEmitter = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  close(): void {
    this.closeDialogEmitter.emit();
  }
}
