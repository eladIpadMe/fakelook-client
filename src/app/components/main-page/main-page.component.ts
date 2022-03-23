import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor() { }
  addPost: boolean = false;

  ngOnInit(): void {
  }
  AddPostBtn(){
    this.addPost = !this.addPost
  }
  SignOut(){
    sessionStorage.removeItem('token'); 
  }
}
