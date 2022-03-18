import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as randomLocation from 'random-location/dist';


import { Post } from 'src/app/models/post.model';


@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.scss'],
})
export class PostsFormComponent implements OnInit {
  @Output() submitEmitter: EventEmitter<Post> = new EventEmitter();
 
post: Post = { description: "", imageSorce: "", x_Position: undefined, y_Position: undefined, z_Position: undefined, date: undefined, userId: 1}   


  file: any;
  Cesium = Cesium;
  
  constructor() {}

  ngOnInit(): void {}
  changeFile(event: any): void {
    this.file = event;
  }
  submitPost(): void {
   
    
    this.post.imageSorce = this.file;
    this.post.x_Position = 4439646.379032415;
    this.post.y_Position = 3109874.6318978276;
    this.post.z_Position = 3350106.354895249;
    this.post.date = new Date;
    this.submitEmitter.emit(this.post);
    
    
  }
  private randomLocation(): any {
    const randomStart = {
      latitude: 37.7768006 * Math.random(),
      longitude: -122.4187928 * Math.random(),
    };
    const radius = 5000000000 * Math.random();
    const { latitude, longitude } = randomLocation.randomCirclePoint(
      randomStart,
      radius
    );

    return Cesium.Cartesian3.fromDegrees(longitude, latitude);
  }
}
