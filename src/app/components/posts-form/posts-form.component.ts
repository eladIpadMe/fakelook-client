import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData, PostsDisplayComponent } from '../posts-display/posts-display.component';

import { Post } from 'src/app/models/post.model';
import { Tag } from 'src/app/models/tag.model';
import { User } from 'src/app/models/user.model';
import { UserTaggedPost } from 'src/app/models/userTaggedPost.model';
import { HashtagService } from 'src/app/services/hashtag.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.scss'],
})
export class PostsFormComponent implements OnInit {
  @Output() submitEmitter: EventEmitter<Post> = new EventEmitter();
 
post: Post= {
   description: "",
    imageSorce: "",
    x_Position: 0,
    y_Position: 0,
    z_Position: 0,
    date: new Date(),
    userId: 0};  
hashtags: Tag[] = [];
usersTagged: UserTaggedPost[] = [];
id: number = 0 ;
file: any;
Cesium = Cesium;
description: string= "";
user: User;
  
  constructor(private hashtagService: HashtagService, private postservice: PostService, private userService: UserService,
    public dialogRef: MatDialogRef<PostsDisplayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) {
    this.id = Number(sessionStorage.getItem('id'))
    this.userService.getUserById(this.id).subscribe(user =>
       this.user = user, (error)=> console.log(error));
  }

  ngOnInit(): void {}

  checkInputFormValidity(array: any){
    if(array === "" || array === ""){
      return null;
    }
    else return array;
  }

  changeFile(event: any): void {
    this.file = event;
  }
  submitPost(): void {
    
    this.post.imageSorce = this.file;
    this.post.userTaggedPost = this.checkInputFormValidity(this.usersTagged);
    this.post.userId = this.id;
    this.post.tags = this.checkInputFormValidity(this.hashtags);
    this.post.date = new Date;
    if(!navigator.geolocation){
      console.log(`location is not supported`);
    }
    navigator.geolocation.getCurrentPosition((postion)=> {
      this.post.x_Position = postion.coords.longitude
      this.post.y_Position = postion.coords.latitude
      this.post.z_Position = 3620170.526302757
      console.log(this.post);
      this.postservice.createPost(this.post);
      
    });
    this.dialogRef.close({event: this.post});
  }
  //get wanted hashtag for chips bar menu
  placeholder(placeholder: string): string{
    return placeholder;
  }
   //users input post users tagged
  addUserTagged(userTags: string[]){
    userTags.forEach(ut =>{
      const newUserTag: UserTaggedPost ={
        userId: this.id
      }
      this.usersTagged.push(newUserTag);
    })
  }
  //users input post taggs
  addTagges(tags: string[]){
    tags.forEach(t => {
      const newTag : Tag = {
          content : t
        }
        this.hashtags.push(newTag);
        this.hashtagService.addTag(newTag).subscribe; 
      });
  }
  //close dialog
  onNoClick(){
    this.dialogRef.close({event: this.post});
  }
}
