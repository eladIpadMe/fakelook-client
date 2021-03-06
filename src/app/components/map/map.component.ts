import { Component, OnInit } from '@angular/core';
import {
  AcNotification,
  ViewerConfiguration,
  AcEntity,
  ActionType
} from 'angular-cesium';
import { Observable } from 'rxjs';
import { mergeMap, map, pairwise,tap } from 'rxjs/operators';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [ViewerConfiguration],
})
export class MapComponent implements OnInit {
  constructor(
    private viewerConf: ViewerConfiguration,
    private postService: PostService
  ) {
    viewerConf.viewerOptions = {
      selectionIndicator: true,
      timeline: false,
      infoBox: false,
      fullscreenButton: false,
      baseLayerPicker: false,
      animation: false,
      homeButton: false,
      geocoder: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
      useDefaultRenderLoop: true,
    };
  }
  entities$!: Observable<AcNotification>;
  entities!: Observable<Post[]>;
  selectedPost!: Post;
  showDialog = false;
  Cesium = Cesium;
  flag = false;
  
  ngOnInit(): void {

      this.entities$ = this.postService.getPosts().pipe(
        pairwise(),
        map((posts) => {
          const combine = posts[0].concat(posts[1])
          return combine.map((post) => ({
            id: this.validationOfId(post),
            actionType: this.getActionType(post,posts[1]),
            entity: this.convertPost(post),
          }));
        }),
        mergeMap((post) => post)
      );
      
     
  }



  getActionType(post: Post, newPosts: Post[]): ActionType {
    let action;
    newPosts.find((p) => p.id === post.id)
      ? (action = ActionType.ADD_UPDATE)
      : (action = ActionType.DELETE);
    return action;
  }
  showFullPost(post: Post): void {
    this.showDialog = true;
    this.selectedPost = post;
  }
  closeDialog(): void {
    this.showDialog = false;
  }

  convertPost(post: Post): AcEntity {
    return {
      id: post.id,
      description: post.description,
      imageSorce: post.imageSorce,
      location: Cesium.Cartesian3.fromDegrees(post.x_Position, post.y_Position),
      isShow: true,
    };
  }
  validationOfId(post: Post): string {
    if (post.id !== undefined){ 
      console.log("ma ze aharaaaa hazeeee" + post.id);
      return post.id.toString();
    }
    console.log('id is undefined');
    return '1';
  }
}
