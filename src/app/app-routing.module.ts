import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
// import { StamComponent } from './components/stam/stam.component';
import { SecretGuard } from './guards/secret.guard';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { LoginComponent } from './components/login/login.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { MapComponent } from './components/map/map.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FilterComponent } from './components/filter/filter.component';
import { FriendsComponent } from './components/friends/friends.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { TagsChipComponent } from './components/tags-chip/tags-chip.component';
import { UsersChipComponent } from './components/users-chip/users-chip.component';
import { PostsFormComponent } from './components/posts-form/posts-form.component';

//import { MapComponent } from './components/map/map.component';

const routes: Routes = [

  {path: 'Main-page', component: MainPageComponent, children: [
    {path: 'Map', component: MapComponent},
    {path: 'TimeLine', component: TimelineComponent}, 
    {path: '', redirectTo: 'Map', pathMatch: 'full'},
    {path: `**`, component: LoginComponent}
  ]},
  

  // {path: 'Side-bar', component: SideBarComponent, children: [
  //   {path: 'Filter', component: FilterComponent},
  //   {path: 'Friends', component: FriendsComponent},
  //   {path: '', redirectTo: 'Filter', pathMatch: 'full'}]},
  // {path: 'Side-bar', component: SideBarComponent, children: [
  //   {path: 'Filter', component: FilterComponent},
  //   {path: 'Friends', component: FriendsComponent},
    //{path: '', redirectTo: 'Timeline', pathMatch: 'full'},
  // ]},
  {path:`new-post`, component: CreatePostComponent},
  {path:`addComment`, component: AddCommentComponent},
  {path:`tagChip`, component: TagsChipComponent},
  {path:`filter`, component: PostsFormComponent},
  {path: `SignUp`, component: SignUpComponent},
  {path: `Login`, component: LoginComponent},
  {path: ``, component: LoginComponent},
  {path: `**`, component: LoginComponent},
  // {
  //   path: `Stam`,
  //   component: StamComponent,
  //   canActivate: [SecretGuard],
  // },
  
  //{path: `map`, component: MapComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
