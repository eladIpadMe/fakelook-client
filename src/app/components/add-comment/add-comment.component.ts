import { Component, Input, OnInit,Inject } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { Tag } from 'src/app/models/tag.model';
import { Comment } from 'src/app/models/comment.model';
import { HashtagService } from 'src/app/services/hashtag.service';
import { UserTaggedComment } from 'src/app/models/userTaggedComment.model';
import { CommentService } from 'src/app/services/comment.service';


import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData, PostsDisplayComponent } from '../posts-display/posts-display.component';



@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  id: number = 0 ;
  userTagged: UserTaggedComment[] =[];
  hashtags: Tag[]= [];
  content: string= "";
  comment: Comment;
  @Input() post?: Post;

  constructor(private commentService: CommentService,
     private hashtagService: HashtagService,
     public dialogRef: MatDialogRef<PostsDisplayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.id = Number(sessionStorage.getItem('id'))
   }
    
  ngOnInit(): void {
  }

  placeholder(placeHolder: string):string{
    return placeHolder;
  }
  updateTagesChosen(tags: string[]){
    tags.forEach(t =>{
      const newTag: Tag ={
        content : t
      }
      this.hashtags.push(newTag);
      this.hashtagService.addTag(newTag).subscribe; 
    })
  }
  updateUsersTagged(userTags: string[]){
    
    userTags.forEach(ut =>{
      const newUserTag: UserTaggedComment ={
        userId: this.id
      }
      this.userTagged.push(newUserTag);
    })
  }
  checkValidancy(array: any){
    if(array.length === 0 || array === "")
      return null;
    return array;
  }

  addComment(){
    const newComment: Comment = {
      content: this.checkValidancy(this.content),
      userId: this.id,
      postId: <number>this.data.post.id,
      //<number>this.post?.id,
      tags: this.checkValidancy(this.hashtags),
      userTaggedComment: this.checkValidancy(this.userTagged)
    }
    this.comment = newComment;
    this.commentService.addComment(newComment);
    this.router.navigateByUrl('/Main-page');
    // this.router.navigateByUrl('/Main-page');
    // this.router.navigateByUrl('/Main-page/-Timeline');
  }

  onNoClick(){
    this.dialogRef.close({event: this.comment});
  }
}
  
  
