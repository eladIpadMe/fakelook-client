import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post.model';
import { PostsFilter } from 'src/app/models/postsfilter.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  filteredPosts: Post[] = [];
  publishers: string[];
  usersTagged: string[];
  hashTags: string[];

  constructor(private postService: PostService) { }
  filterForm = new FormGroup({
    DateFrom: new FormControl('', [
    ]),
    DateTo: new FormControl('', [
    ]),
    Publishers: new FormControl('', [
    ]),
    Tags: new FormControl('', [
    ]),
    TagsUsers: new FormControl('', [
    ]),
    // role: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
  }
  //match input to servers format
  checkInputFormValidity(array: any){
    
    if(array === "" || array === ""){
      return null;
    }
    else
    return array;
  }
  submitPost(){
    let postFilter: PostsFilter ={
      publishers : (this.checkInputFormValidity(this.publishers)) ,
      startingDate: this.checkInputFormValidity(this.filterForm.controls.DateFrom.value),
      endingDate: this.checkInputFormValidity(this.filterForm.controls.DateTo.value),
      hashtags : this.checkInputFormValidity(this.hashTags),
      taggesUsers: this.checkInputFormValidity(this.usersTagged)
    }
    debugger;

    this.postService.filterPosts(postFilter);
  }
  //get wanted hashtag for chips bar menu
  placeholder(placeHolder: string):string{
    return placeHolder;
  }
  //update publishers to users input
  addPublishersFilter(publishers: string[]){
    this.publishers = publishers;
  }
  //update tagged users to users input
  addUserTaggedFilter(usersTagged: string[]){
    this.usersTagged = usersTagged;
  }
   //update taggs users to users input
  addTaggesFilter(taggs: string[]){
    this.hashTags = taggs;
  }
}