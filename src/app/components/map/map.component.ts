import { Component, OnInit } from '@angular/core';
import {
  AcNotification,
  ViewerConfiguration,
  ActionType,
  AcEntity,
} from 'angular-cesium';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { Post } from 'src/app/models/post.model';
// import { PostService } from 'src/app/services/post.service';
import { PostsService } from 'src/app/services/posts.service';
// import { Post } from 'src/app/shared/post.model';
// import { Post } from 'src/app/shared/models/post.model';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [ViewerConfiguration, PostsService],
})
export class MapComponent implements OnInit {
  constructor(
    private viewerConf: ViewerConfiguration,
    private postService: PostsService
  ) {
    viewerConf.viewerOptions = {
      selectionIndicator: true,
      timeline: true,
      infoBox: true,
      fullscreenButton: true,
      baseLayerPicker: true,
      animation: true,
      homeButton: true,
      geocoder: true,
      navigationHelpButton: true,
      navigationInstructionsInitiallyVisible: true,
      useDefaultRenderLoop: true,
    };
  }
  entities$!: Observable<AcNotification>;
  selectedPost!: Post;
  showDialog = false;
  Cesium = Cesium;
  ngOnInit(): void {
    this.entities$ = this.postService.getPosts().pipe(
      map((posts) => {
        return posts.map((post) => ({
          
          id: this.validationOfId(post),// validation - not undefined
          actionType: ActionType.ADD_UPDATE, //: ActionType.DELETE, post.isShow ? 
          entity: this.convertPost(post)
        }));
      }),
      mergeMap((entity) => entity)
    );
  }
  showFullPost(post: Post): void {
    this.showDialog = true;
    this.selectedPost = post;
  }
  closeDialog(): void {
    this.showDialog = false;
  }

  convertPost(post: Post): AcEntity {
    return {id: post.id, description: post.description, imageSorce: post.imageSorce,
       location: Cesium.Cartesian3.fromDegrees(post.x_position,  post.y_position), isShow: true}
  }
  // {x: post.x_Position, y: post.y_Position, z: post.z_Position }
  validationOfId(post: Post): string  {
    if(post.id !== undefined)
      return  post.id.toString()
    console.log("id is undefined")
    return "1";
  }

  // export class Post {
  //   id!: string;
  //   description!: string;
  //   imageSrc!: string;
  //   location!: { x: number; y: number; z: number };
  //   isShow!: boolean;
  // }
}
