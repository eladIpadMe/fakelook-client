import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
