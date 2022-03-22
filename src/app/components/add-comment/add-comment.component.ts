import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { Tag } from 'src/app/models/tag.model';
import { User } from 'src/app/models/user.model';
import { HashtagService } from 'src/app/services/hashtag.service';
import { UserService } from 'src/app/services/user.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}];

 
 
  users: User[] = [];
  hashtags: Tag[] = [];
  currentUser?: User;
  content: string= "";
  @Input() post?: Post;
  constructor(private userService: UserService, private hashtagService: HashtagService) { }

  ngOnInit(): void {
    //get all users accept current
   
    const currentUserId = Number(sessionStorage.getItem('id'));
    this.userService.getUserById(currentUserId).subscribe(u=>
      this.currentUser = u,
      (error)=> console.log(error));
    this.userService.getAllUsers().subscribe((users)=>
    users.forEach(u => {
      if(u.userName !== this.currentUser?.userName){
        this.users.push(u);
      }
    }
  ),
  (error)=> console.log(error));

  //get all hashtags
  this.hashtagService.getAllTags().subscribe((tags)=>{
    this.hashtags = tags
  },
  (error)=> console.log(error));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  // addComment(){
  //   const comment: Comment = {
  //     content: this.content,
  //     userId : <number>this.currentUser?.id,
  //     postId: <number>this.post?.id

  //   }
  // }
}
  
  
