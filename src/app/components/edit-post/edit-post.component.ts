import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { Tag } from 'src/app/models/tag.model';
import { User } from 'src/app/models/user.model';
import { UserTaggedPost } from 'src/app/models/userTaggedPost.model';
import { HashtagService } from 'src/app/services/hashtag.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})







///////////////


export class EditPostComponent implements OnInit {
  @Output() submitEmitter: EventEmitter<Post> = new EventEmitter();
  @Input() postId: number | undefined;
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
  
  constructor(private hashtagService: HashtagService, private postservice: PostService, private userService: UserService, private router: Router) {
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
    debugger;
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
      // this.postservice.createPost(this.post);
    });
    if(this.postId !== undefined)
    this.postservice.getPost(this.postId).subscribe(
      (res) => {
        debugger;

        if (res != null) {
          res.description = this.post.description;
          res.imageSorce = this.post.imageSorce;
          res.x_Position = this.post.x_Position;
          res.y_Position = this.post.y_Position;
          res.z_Position = this.post.z_Position;
          res.date = this.post.date;
          res.userId = this.post.userId;
          res.userTaggedPost = this.post.userTaggedPost;
        
           this.postservice.updatePost(res);
           debugger;
            this.router.navigateByUrl('/TimeLine');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  placeholder(placeholder: string): string{
    return placeholder;
  }
  addUserTagged(userTags: string[]){
    userTags.forEach(ut =>{
      const newUserTag: UserTaggedPost ={
        userId: this.id
      }
      this.usersTagged.push(newUserTag);
    })
  }
  addTagges(tags: string[]){
    tags.forEach(t => {
      const newTag : Tag = {
          content : t
        }
        this.hashtags.push(newTag);
        this.hashtagService.addTag(newTag).subscribe; 
      });
  }
  // private randomLocation(): any {
  //   const randomStart = {
  //     latitude: 37.7768006 * Math.random(),
  //     longitude: -122.4187928 * Math.random(),
  //   };
  //   const radius = 5000000000 * Math.random();
  //   const { latitude, longitude } = randomLocation.randomCirclePoint(
  //     randomStart,
  //     radius
  //   );

  //   return Cesium.Cartesian3.fromDegrees(longitude, latitude);
  // }
}

