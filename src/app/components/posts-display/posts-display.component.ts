import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Like } from 'src/app/models/like.model';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { Comment } from 'src/app/models/comment.model';
import { LikeService } from 'src/app/services/like.service';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

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
    @Input() posts: Post[] | undefined;
  postsD: Post[] = [];
  dispalyLikesPressed: boolean[] = [];
  commentsPressed: boolean[] = [];
  likedPost: boolean[] = [];
  user?: User;
  newLike: boolean = true;
  userId: number = 0;
  likesCount = new Map();
  // @Input() posts$!: Observable<Post[]>;
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
      this.postsD = posts;
      console.log(this.posts);
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
          console.log(like);
          if(like.userId === this.userId && like.isActive === true){
            this.likedPost[<number>p.id] = true;
          }
        });

        this.likesCount.forEach(item =>{
          if(item !== undefined || item !== null){
            item = false;
          }
        });
         
        //this.likedPost[<number>p.id]= false;
        this.dispalyLikesPressed[<number>p.id] = false;
        this.commentsPressed[<number>p.id] = false;
      })
    },
    (error) => console.log(error))
  }
  findIndex(post: Post): Number{
    return this.likesCount.get(post.id);
  }
  // deletePost(post: Post): void {
  //   this.postDeleteEventEmitter.emit(post.id);
  // }

  highlightLike(post: Post){
    this.likedPost[<number>post.id] = !this.likedPost[<number>post.id];
    this.postService.manageLike(<number>post.id, this.userId);
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
  addComment(event: any, post: Post){
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
