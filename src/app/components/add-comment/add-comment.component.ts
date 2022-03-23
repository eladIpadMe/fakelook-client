import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { Tag } from 'src/app/models/tag.model';
import { Comment } from 'src/app/models/comment.model';
import { HashtagService } from 'src/app/services/hashtag.service';
import { UserService } from 'src/app/services/user.service';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, Observable, startWith} from 'rxjs';
import { UserTaggedComment } from 'src/app/models/userTaggedComment.model';
import { CommentService } from 'src/app/services/comment.service';



@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  id: number = 0 ;
 

  //users
  
  // separatorKeysCodes: number[] = [ENTER, COMMA];
  // fruitCtrl = new FormControl();
  // filteredFruits: Observable<string[]>;
  // fruits: string[] = ['Lemon'];
  // allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  // @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
 
  
  // addOnBlur = true;
  // readonly separatorKeysCodes = [ENTER, COMMA] as const;
  // fruits: Fruit[] = [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}];


  //hashtags: Tag[] = [];
  userTagged: UserTaggedComment[] =[];
  hashtags: Tag[]= [];
  content: string= "";
  @Input() post?: Post;
  constructor(private commentService: CommentService, private hashtagService: HashtagService) {
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
      postId: <number>this.post?.id,
      tags: this.checkValidancy(this.hashtags),
      userTaggedComment: this.checkValidancy(this.userTagged)
    }
    console.log(newComment);
    this.commentService.addComment(newComment);
  }
}
  
  
