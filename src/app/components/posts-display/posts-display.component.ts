import { Component, EventEmitter, Input, OnInit, Output, ViewChild,Inject } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddCommentComponent } from '../add-comment/add-comment.component';
export interface DialogData {
  post: Post;
}
@Component({
  selector: 'app-posts-display',
  templateUrl: './posts-display.component.html',
  styleUrls: ['./posts-display.component.scss'],
})
export class PostsDisplayComponent implements OnInit {
  likeLogoSrc: string = "..\..\..\assets\like-logo-original.png";
  constructor(private postService: PostService, 
    private userService: UserService,
    private commentService: CommentService,
    public dialog: MatDialog) {}
  posts: Post[] = [];
  dispalyLikesPressed: boolean[] = [];
  commentsPressed: boolean[] = [];
  likedPost: boolean[] = [];
  user?: User;
  newLike: boolean = true;
  userId: number = 0;
  likesCount = new Map();
  booleanLikeArray: Boolean[] = [];
  currUserId: string | null =  sessionStorage.getItem('id');
  addCommentPresed: boolean = false;
  clickedToEdit: boolean = false;
  @Output() postDeleteEventEmitter = new EventEmitter<string>();
  
  ngOnInit(): void {
    this.getPosts();
    this.userId = Number(sessionStorage.getItem('id'));
    this.userService.getUserById(this.userId).subscribe((user)=> {
      this.user = user;
   
    },
    (error) => console.log(error));
  }


  isMypost (postId: number | undefined){
    // debugger;
    var tmp = Number(sessionStorage.getItem("id"));
    var bol =  Number(sessionStorage.getItem("id")) === postId;
   return Number(sessionStorage.getItem("id")) === postId
     
  }

  isEditClicked(){
    this.clickedToEdit = !this.clickedToEdit
  }
  getPosts(){
    this.postService.getPosts().subscribe((posts) =>{
      this.posts = posts;
      console.log(this.posts);
      this.posts.forEach(p =>{
        p.likes?.forEach(like => {
          if(like.isActive){
            if(this.likesCount.get(p.id) != null){
              this.likesCount.set(p.id, this.likesCount.get(p.id) + 1)
            }
            else{
              this.likesCount.set(p.id, 1);
            }
          }
          if(like.userId === this.userId ){
            this.booleanLikeArray[<number>p.id] = false;
            if(like.isActive === true){
            this.likedPost[<number>p.id] = true;
            }
          }
        });

        this.likesCount.forEach(item =>{
          if(item !== undefined || item !== null){
            item = false;
          }
        });
         
        this.dispalyLikesPressed[<number>p.id] = false;
        this.commentsPressed[<number>p.id] = false;
      })
    },
    (error) => console.log(error))
  }
  findIndex(post: Post): Number{
    return this.likesCount.get(post.id);
  }
  
//highlite like when pressed
  highlightLike(post: Post){
    this.likedPost[<number>post.id] = !this.likedPost[<number>post.id];
    this.postService.manageLike(<number>post.id, this.userId);
    if(this.likedPost[<number>post.id] === true){
      this.likesCount.set(post.id, this.likesCount.get(post.id) + 1);
    }
    else{
      this.likesCount.set(post.id, this.likesCount.get(post.id) - 1);
    }
  }
  //open comment dialog to add comment
  openDialog(post: Post): void{
    const dialogRef = this.dialog.open(AddCommentComponent
      ,{data: {post: post}});
      dialogRef.afterClosed().subscribe(comment=>{
        post.comments?.push(comment);
        console.log("new comment");
        console.log(comment);
      });
  }

  blockUser(post: Post){
    this.commentsPressed[<number>post.id] = false;
  }
//when like menu pressed display all posts likes
  showLikesList(post: Post){
    this.dispalyLikesPressed[<number>post.id] = !this.dispalyLikesPressed[<number>post.id];
  }
//check if likes bar pressed
  checkIfLiked(post: Post): boolean{
    return this.likedPost[<number>post.id];
  }
  //check if comments bar pressed
  checkIfDisplayComments(post: Post): boolean{
    return this.commentsPressed[<number>post.id];
  }
//display comments
  ShowCommentComponent(): boolean{
    this.addCommentPresed = !this.addCommentPresed;
    return this.addCommentPresed;
  }

  showComments(post: Post){
    this.commentsPressed[<number>post.id] = !this.commentsPressed[<number>post.id];
  }
  //return boolean if comments bar pressed
  findIfCommentPressed(post: Post): boolean{
    return this.commentsPressed[<number>post.id];
  }
  
  exitLikesScreen(post: Post){
    this.dispalyLikesPressed[<number>post.id] = false;
  }

  checkIfDisplayLikesPressed(post: Post): boolean{
    return this.dispalyLikesPressed[<number>post.id];
  }
}
