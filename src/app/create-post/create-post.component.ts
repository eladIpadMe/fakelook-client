import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  x_Position: number= 0.0;
  y_Position: number= 0.0;
  z_Position: number= 0.0;
  description: string= "";
  imageSorce: string = "";

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  getPictureUrl(picUrl: any){
    this.imageSorce = picUrl;
    console.log("picture uploaded");
  }
  addPost(){
    let token = sessionStorage.getItem('token');
     const post :Post= {
      userId : 1,
      description: this.description,
      imageSorce : this.imageSorce,
      x_Position: this.x_Position,
      y_Position: this.y_Position,
      z_Position: this.z_Position,
      date: new Date
    }
    // console.log(post);
    // console.log(typeof(post));
    // let jpost = JSON.stringify(post);
    // console.log(jpost);
    this.postService.createPost(post);
  }
}
