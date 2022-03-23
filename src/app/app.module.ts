import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { StamComponent } from './components/stam/stam.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
//import { MapComponent } from './components/map/map.component';
//import { PostsDialogComponent } from './components/posts-dialog/posts-dialog.component';
import { PostsDisplayComponent } from './components/posts-display/posts-display.component';
import { PostsFormComponent } from './components/posts-form/posts-form.component';
import { PostsMenuComponent } from './components/posts-menu/posts-menu.component';
import { RouterModule } from '@angular/router';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { AngularCesiumModule, AngularCesiumWidgetsModule } from 'angular-cesium';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FilterComponent } from './components/filter/filter.component';
import { FriendsComponent } from './components/friends/friends.component';
import { MapModule } from './components/map.module';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
//import {MatChipsModule, MAT_CHIPS_DEFAULT_OPTIONS} from '@angular/material/chips';
//import { MatInputModule} from '@angular/material/input';
//import { MatIconModule } from '@angular/material/icon'
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { TagsChipComponent } from './components/tags-chip/tags-chip.component';
import { UsersChipComponent } from './components/users-chip/users-chip.component';
@NgModule({
  declarations: [
    TagsChipComponent,
    UsersChipComponent,
    AppComponent,
    FilterComponent,
    FriendsComponent,
    SideBarComponent,
    LoginComponent,
    SignUpComponent,
    CreatePostComponent,
    FileUploadComponent,
    //MapComponent,
    TimelineComponent,
    MainPageComponent,
    //PostsDialogComponent,
    PostsDisplayComponent,
    PostsFormComponent,
    PostsMenuComponent,
    AddCommentComponent
  ],
  imports: [
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
   // MatIconModule,
    //MatInputModule,
    //MatChipsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    MapModule,
    AngularCesiumModule.forRoot(),
   AngularCesiumWidgetsModule,
     ReactiveFormsModule,
     BrowserAnimationsModule,
     HttpClientModule
  ],
  exports: [ RouterModule  ],
  providers: [],
  bootstrap: [AppComponent]
})
//export class AppRoutingModule {  }
export class AppModule { }
