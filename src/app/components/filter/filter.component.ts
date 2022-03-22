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

  checkInputFormValidity(array: any){
    if(array === ""){
      return null;
    }
    else
    return array;
  }
  submitPost(){
    let postFilter: PostsFilter ={
      publishers : this.checkInputFormValidity(this.filterForm.controls.Publishers.value),
      startingDate: this.filterForm.controls.DateFrom.value,
      endingDate: this.filterForm.controls.DateTo.value,
      hashtags : this.checkInputFormValidity(this.filterForm.controls.Tags.value),
      taggesUsers: this.checkInputFormValidity(this.filterForm.controls.TagsUsers.value)
    }
    console.log("filter is: ");
    console.log(postFilter);
    this.postService.filterPosts(postFilter).subscribe((filteredPosts)=> {
      this.filteredPosts = filteredPosts
      console.log("returned posts are: ");
      console.log(this.filteredPosts);
    },
    (error) => console.log(error))
  }

  
  
}
