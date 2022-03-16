import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/shared/post.model';
import * as randomLocation from 'random-location/dist';
// import { Post } from 'src/app/shared/models/post.model';
// const randomLocation = require('random-location');

@Component({
  selector: 'app-posts-form',
  templateUrl: './posts-form.component.html',
  styleUrls: ['./posts-form.component.scss'],
})
export class PostsFormComponent implements OnInit {
  @Output() submitEmitter: EventEmitter<FormData> = new EventEmitter();
  post = new Post();
  file: any;
  Cesium = Cesium;
  
  constructor() {}

  ngOnInit(): void {}
  changeFile(event: any): void {
    this.file = event.target.files[0];
  }
  submitPost(img: any): void {
    const form = new FormData();
    form.append('description', this.post.description);
    form.append('location', JSON.stringify(this.randomLocation()));
    form.append('image', this.file);
    this.submitEmitter.emit(form);
    this.post = new Post();
    img.value = '';
    this.file = undefined;
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
