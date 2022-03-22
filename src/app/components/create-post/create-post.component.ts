import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  x_position: number= 0.0;
  y_position: number= 0.0;
  z_position: number= 0.0;
  description: string= "";
  imageSorce: string = "";
  user= {} as User;

  constructor(private postService: PostService, private userService: UserService) { }
 
  ngOnInit(): void {
    let id = Number(sessionStorage.getItem("id"));
    this.userService.getUserById(id).subscribe((user) =>
      this.user = user)
  }

  getPictureUrl(picUrl: any){
    this.imageSorce = picUrl;
    console.log("picture uploaded");
  }
  addPost(){
    let token = sessionStorage.getItem('token');
    
    let id = Number(sessionStorage.getItem("id"));
     const post :Post= {
       
      userId : id,
      description: this.description,
      imageSorce : this.imageSorce,
      x_position: this.x_position,
      y_position: this.y_position,
      z_position: this.z_position,
      date: new Date
    }
    console.log(post);
    // console.log(typeof(post));
    // let jpost = JSON.stringify(post);
    // console.log(jpost);
    this.postService.createPost(post);
  }
}
