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
 
post: Post = { description: "", imageSorce: "", x_Position: 0, y_Position: 0, z_Position: null, date: undefined, userId: 1}   


  file: any;
  Cesium = Cesium;
  
  constructor() {}

  ngOnInit(): void {}
  changeFile(event: any): void {
    this.file = event;
  }
  submitPost(): void {
    
    this.post.imageSorce = this.file;
    if(!navigator.geolocation){
      console.log(`location is not supported`);
    }
    navigator.geolocation.getCurrentPosition((postion)=> {
      this.post.x_Position = postion.coords.longitude
      this.post.y_Position = postion.coords.latitude
      // if(postion.coords.altitude !== null)
      this.post.z_Position = 3620170.526302757
      // postion.coords.altitude לטפל בזה בהמשך
      // else  this.post.z_Position = 0
      this.post.date = new Date;
      this.submitEmitter.emit(this.post);
    });
    
  }
  // private randomLocation(): any {
  //   const randomStart = {
  //     latitude: 37.7768006 * Math.random(),
  //     longitude: -122.4187928 * Math.random(),
  //   };
  //   const radius = 5000000000 * Math.random();
  //   const { latitude, longitude } = randomLocation.randomCirclePoint(
  //     randomStart,
  //     radius
  //   );

  //   return Cesium.Cartesian3.fromDegrees(longitude, latitude);
  // }
}
