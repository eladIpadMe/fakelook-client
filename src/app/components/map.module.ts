import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AngularCesiumModule } from 'angular-cesium';
import { AngularCesiumWidgetsModule } from 'angular-cesium';
import { MapComponent } from './map/map.component';
import { PostsDialogComponent } from './posts-dialog/posts-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MapComponent,
    PostsDialogComponent,
  ],
  exports: [MapComponent],
  imports: [
    CommonModule,
    AngularCesiumModule.forRoot(),
    AngularCesiumWidgetsModule,
    HttpClientModule,
    FormsModule,
  ]
})
export class MapModule {}
