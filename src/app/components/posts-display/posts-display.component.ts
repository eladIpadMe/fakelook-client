import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Like } from 'src/app/models/like.model';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { LikeService } from 'src/app/services/like.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-posts-display',
  templateUrl: './posts-display.component.html',
  styleUrls: ['./posts-display.component.scss'],
})
export class PostsDisplayComponent implements OnInit {
  likeLogoSrc: string = "..\..\..\assets\like-logo-original.png";
  constructor(private postService: PostService, 
    private userService: UserService,
    private likeService: LikeService) {}
  posts: Post[] = [];
  likesPressed: boolean = false;
  commentsPressed: boolean = false;
  likedPost: boolean = false;
  user?: User;
  newLike: boolean = true;
 

  //@Input() posts$!: Observable<Post[]>;
  @Output() postDeleteEventEmitter = new EventEmitter<string>();
  
  ngOnInit(): void {
    this.getPosts();
    let id = Number(sessionStorage.getItem('id'));
    this.userService.getUserById(id).subscribe((user)=> {
      this.user = user
    },
    (error) => console.log(error));
  }

  getPosts(){
    this.postService.getPosts().subscribe((posts) =>{
      this.posts = posts;
      
      console.log(this.posts);
    },
    (error) => console.log(error))
  }

  deletePost(id: string): void {
    this.postDeleteEventEmitter.emit(id);
  }

  highlightLike(post: Post){
    this.likedPost = !this.likedPost;

    if(this.likedPost){
      this.likeLogoSrc = "..\..\..\assets\blue-like-logo.png";
    }

  else{
    this.likeLogoSrc = "..\..\..\assets\like-logo-original.png";
  }
    post.likes.forEach(like => {
      if(like.user === this.user){
        this.newLike = false;
      }
      else{
        like.isActive = !like.isActive;
      }
    });
    if(this.newLike){
      let like = {
        isActive: true,
        user: <User>this.user,
        post: post
      }
      this.likeService.createLike(like);
    }
    //this.postService.updatePost(post);
  }

  comment(){

  }

  blockUser(){

  }

  showLikesList(){
    this.likesPressed = !this.likesPressed;
  }

  showComments(){
    this.commentsPressed = !this.commentsPressed;

  }
  exitLikesScreen(){
    this.likesPressed = false;
  }
}
