import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularCesiumModule } from 'angular-cesium';
import { AngularCesiumWidgetsModule } from 'angular-cesium';
import { MapComponent } from './map/map.component';
import { PostsDisplayComponent } from './posts-display/posts-display.component';
import { PostsFormComponent } from './posts-form/posts-form.component';
import { PostsMenuComponent } from './posts-menu/posts-menu.component';
import { PostsDialogComponent } from './posts-dialog/posts-dialog.component';
import { FormsModule } from '@angular/forms';
import { PostsService } from '../services/posts.service';
// import { MapComponent } from './components/map/map.component';
// import { PostsService } from './services/posts.service';
// import { PostsDisplayComponent } from './components/posts-display/posts-display.component';
// import { PostsFormComponent } from './components/posts-form/posts-form.component';
// import { PostsMenuComponent } from './components/posts-menu/posts-menu.component';
// import { FormsModule } from '@angular/forms';
// import { PostsDialogComponent } from './components/posts-dialog/posts-dialog.component';

@NgModule({
  declarations: [
    MapComponent,
    PostsDisplayComponent,
    PostsFormComponent,
    PostsMenuComponent,
    PostsDialogComponent,
  ],
  exports: [MapComponent],
  imports: [
    CommonModule,
    AngularCesiumModule.forRoot(),
    AngularCesiumWidgetsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [PostsService],
})
export class MapModule {}