// import { Component, OnInit } from '@angular/core';
// // import {
// //   AcNotification,
// //   ViewerConfiguration,
// //   ActionType,
// // } from 'angular-cesium';
// import { Observable } from 'rxjs';
// import { mergeMap, map } from 'rxjs/operators';
// import { Post } from 'src/app/shared/post.model';
// // import { Post } from 'src/app/shared/models/post.model';
// import { PostsService } from '../../services/posts.service';

// @Component({
//   selector: 'app-map',
//   templateUrl: './map.component.html',
//   styleUrls: ['./map.component.scss']
//   // providers: [ViewerConfiguration, PostsService],
// })
// export class MapComponent implements OnInit {
//   constructor(
//    // private viewerConf: ViewerConfiguration,
//     private postService: PostsService
//   ) {
//     // viewerConf.viewerOptions = {
//     //   selectionIndicator: true,
//     //   timeline: true,
//     //   infoBox: true,
//     //   fullscreenButton: true,
//     //   baseLayerPicker: true,
//     //   animation: true,
//     //   homeButton: true,
//     //   geocoder: true,
//     //   navigationHelpButton: true,
//     //   navigationInstructionsInitiallyVisible: true,
//     //   useDefaultRenderLoop: true,
//     // };
//   }
//   entities$!: Observable<AcNotification>;
//   selectedPost!: Post;
//   showDialog = false;
//   Cesium = Cesium;
//   ngOnInit(): void {
//     this.entities$ = this.postService.getPostsWithDeleted().pipe(
//       map((posts) => {
//         return posts.map((post) => ({
//           id: post.id,
//           actionType: post.isShow ? ActionType.ADD_UPDATE : ActionType.DELETE,
//           entity: post,
//         }));
//       }),
//       mergeMap((entity) => entity)
//     );
//   }
//   showFullPost(post: Post): void {
//     this.showDialog = true;
//     this.selectedPost = post;
//   }
//   closeDialog(): void {
//     this.showDialog = false;
//   }
// }
