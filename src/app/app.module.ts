import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { StamComponent } from './components/stam/stam.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MapComponent } from './components/map/map.component';
import { PostsDialogComponent } from './components/posts-dialog/posts-dialog.component';
import { PostsDisplayComponent } from './components/posts-display/posts-display.component';
import { PostsFormComponent } from './components/posts-form/posts-form.component';
import { PostsMenuComponent } from './components/posts-menu/posts-menu.component';
import { AngularCesiumModule } from 'angular-cesium';
import { AngularCesiumWidgetsModule } from 'angular-cesium';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    AppComponent,
    StamComponent,
    LoginComponent,
    SignUpComponent,
    CreatePostComponent,
    FileUploadComponent,
    MapComponent,
    PostsDialogComponent,
    PostsDisplayComponent,
    PostsFormComponent,
    PostsMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    AngularCesiumModule.forRoot(),
    AngularCesiumWidgetsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
