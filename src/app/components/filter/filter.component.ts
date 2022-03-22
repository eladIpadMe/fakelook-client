import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  }
}
