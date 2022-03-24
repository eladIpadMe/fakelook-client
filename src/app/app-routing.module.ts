import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { TagsChipComponent } from './components/tags-chip/tags-chip.component';
import { PostsFormComponent } from './components/posts-form/posts-form.component';

const routes: Routes = [

  {path: 'Main-page', component: MainPageComponent, children: [
    {path: 'Map', component: MapComponent},
    {path: 'TimeLine', component: TimelineComponent},
    {path: '', redirectTo: 'TimeLine', pathMatch: 'full'},
    {path: `**`, component: TimelineComponent}
  ]},
  {path:`addComment`, component: AddCommentComponent},
  {path:`tagChip`, component: TagsChipComponent},
  {path:`filter`, component: PostsFormComponent},
  {path: `SignUp`, component: SignUpComponent},
  {path: `ForgotPassword`, component: ForgotPasswordComponent},
  {path: `Login`, component: LoginComponent},
  {path: ``, component: LoginComponent},
  {path: `**`, component: LoginComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
