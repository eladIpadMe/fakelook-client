import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsFilter } from 'src/app/models/postsfilter.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor() { }
  filterForm = new FormGroup({
    DateFrom: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    DateTo: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    Publishers: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    Tags: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    TagsUsers: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    // role: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
  }
  submitPost(){
    let postFilte: PostsFilter ={
      publishers : this.filterForm.controls.Publishers.value,
      startingDate: this.filterForm.controls.DateFrom.value,
      endingDate: this.filterForm.controls.DateTo.value,
      hashtags : this.filterForm.controls.Tags.value,
      taggesUsers: this.filterForm.controls.TagsUsers.value
    }
  }
}
