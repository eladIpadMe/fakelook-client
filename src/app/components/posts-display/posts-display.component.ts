import { Component, EventEmitter, Input, OnInit, Output, ViewChild,Inject } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { Comment } from 'src/app/models/comment.model';
import { LikeService } from 'src/app/services/like.service';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';


import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddCommentComponent } from '../add-comment/add-comment.component';
export interface DialogData {
  post: Post;
  //name: string;
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
    @Input() posts: Post[] | undefined;
  postsD: Post[] = [];
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

  getPosts(){
  
    this.postService.getPosts().subscribe((posts) =>{
      this.postsD = posts;
      this.postsD.forEach(p =>{
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
  

  highlightLike(post: Post){
    this.likedPost[<number>post.id] = !this.likedPost[<number>post.id];
    this.postService.manageLike(<number>post.id, this.userId);
    if(this.likedPost[<number>post.id] === true){
      this.likesCount.set(post.id, this.likesCount.get(post.id) + 1);
    }
    else{
      this.likesCount.set(post.id, this.likesCount.get(post.id) - 1);
    }
    
   

 
    // console.log("the liked post is: ");
    // console.log(post);
    // if(post.likes){
    //   post.likes.forEach(like => {
    //     if(like.user === this.user){
    //       this.newLike = false;
    //       this.getLike()
    //     }
    //     // else{
    //     //   like.isActive = !like.isActive;
    //     // }
    //   });
    // }
    // //like already exists and the user removed it- update database
    //   if(!this.newLike){
    //     this.likeService.updateLike(like)
    //   }

    //   //new like- add to database
    //   if(this.newLike){
    //     let like = {
    //       isActive: true,
    //       userId: this.userId,
    //       postId: <number>post.id
    //     }
    //     console.log(`new Like is: `);
    //     console.log(like);
    //     this.likeService.createLike(like);
    //     console.log(post);
    //   }
  
  
    //this.postService.updatePost(post);

  }
  openDialog(post: Post): void{
    const dialogRef = this.dialog.open(AddCommentComponent
      ,{data: {post: post}});
      dialogRef.afterClosed().subscribe(comment=>{
        post.comments?.push(comment);
        console.log("new comment");
        console.log(comment);
      });
  }
  
  comment(){

  }

  blockUser(post: Post){
    this.commentsPressed[<number>post.id] = false;
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

  ShowCommentComponent(): boolean{
    this.addCommentPresed = !this.addCommentPresed;
    console.log(this.addCommentPresed);
    return this.addCommentPresed;
  }
  showComments(post: Post){
    this.commentsPressed[<number>post.id] = !this.commentsPressed[<number>post.id];

  }
  findIfCommentPressed(post: Post): boolean{
    return this.commentsPressed[<number>post.id];
  }
  exitLikesScreen(post: Post){
    this.dispalyLikesPressed[<number>post.id] = false;
  }

  checkIfDisplayLikesPressed(post: Post): boolean{
    return this.dispalyLikesPressed[<number>post.id];
  }
  addComment(event: any, post: Post){
    let newCommentContent = event.target.value;
    //console.log(newCommentContent);
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

  Edit(post: Post){
    this.clickedToEdit = !this.clickedToEdit;
  }

  Delete(post: Post){
    if(post.id !== undefined)
    this.postService.deletePost(post.id);
  }

  isUserPost(postId: number | undefined): boolean{
    return postId === Number(this.currUserId)
  }
}
