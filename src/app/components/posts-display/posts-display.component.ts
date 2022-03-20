import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Like } from 'src/app/models/like.model';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { Comment } from 'src/app/models/comment.model';
import { LikeService } from 'src/app/services/like.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-posts-display',
  templateUrl: './posts-display.component.html',
  styleUrls: ['./posts-display.component.scss'],
})
export class PostsDisplayComponent implements OnInit {
  likeLogoSrc: string = "..\..\..\assets\like-logo-original.png";
  constructor(private postService: PostService, 
    private userService: UserService,
    private likeService: LikeService,
    private commentService: CommentService) {}
  posts: Post[] = [];
  dispalyLikesPressed: boolean[] = [];
  commentsPressed: boolean[] = [];
  likedPost: boolean[] = [];
  user?: User;
  newLike: boolean = true;
  userId: number = 0;
  //@Input() posts$!: Observable<Post[]>;
  @Output() postDeleteEventEmitter = new EventEmitter<string>();
  
  ngOnInit(): void {
    this.getPosts();
    this.userId = Number(sessionStorage.getItem('id'));
    this.userService.getUserById(this.userId).subscribe((user)=> {
      this.user = user;
      console.log(`User is: `);
      console.log(this.user);
    },
    (error) => console.log(error));

  }

  getPosts(){
    this.postService.getPosts().subscribe((posts) =>{
      this.posts = posts;
      console.log(this.posts);
      this.posts.forEach(p =>{
        this.likedPost[<number>p.id]= false;
        this.dispalyLikesPressed[<number>p.id] = false;
        this.commentsPressed[<number>p.id] = false;
      })
    },
    (error) => console.log(error))
  }

  deletePost(id: string): void {
    this.postDeleteEventEmitter.emit(id);
  }

  highlightLike(post: Post){
    this.likedPost[<number>post.id] = !this.likedPost[<number>post.id];
  if(this.likedPost[<number>post.id]){
    console.log("the liked post is: ");
    console.log(post);
    if(post.likes){
      post.likes.forEach(like => {
        if(like.user === this.user){
          this.newLike = false;
        }
        // else{
        //   like.isActive = !like.isActive;
        // }
      });
    }
      
      if(this.newLike){
        let like = {
          isActive: true,
          userId: this.userId,
          postId: <number>post.id
        }
        console.log(`new Like is: `);
        console.log(like);
        this.likeService.createLike(like);
        console.log(post);
      }
  }
  
    //this.postService.updatePost(post);
  }

  comment(){

  }

  blockUser(){

  }

  showLikesList(post: Post){
    this.dispalyLikesPressed[<number>post.id] = !this.dispalyLikesPressed[<number>post.id];
  }

  checkIfLiked(post: Post): boolean{
    return this.likedPost[<number>post.id];
  }
  checkIfDisplayComments(post: Post): boolean{
    return this.commentsPressed[<number>post.id];
  }


  showComments(post: Post){
    this.commentsPressed[<number>post.id] = !this.commentsPressed[<number>post.id] ;
    //this.input.nativeElement.focus();
    console.log(document.getElementById("stam"));
    document.getElementById("input")?.focus();

  }
  exitLikesScreen(post: Post){
    this.dispalyLikesPressed[<number>post.id] = false;
  }

  checkIfDisplayLikesPressed(post: Post): boolean{
    return this.dispalyLikesPressed[<number>post.id];
  }
  addComent(event: any, post: Post){
    let newCommentContent = event.target.value;
    console.log(newCommentContent);
    event.target.value = "";
    let newComment: Comment= {
      content: newCommentContent,
      postId: <number>post.id,
      userId : this.userId,
      
    }
    this.commentService.addComment(newComment);
    newComment.user = this.user;
    post.comments?.push(newComment);
    
  }
}
