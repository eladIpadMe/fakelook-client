import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
// import { StamComponent } from './components/stam/stam.component';
import { SecretGuard } from './guards/secret.guard';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { FilterComponent } from './components/filter/filter.component';
import { FriendsComponent } from './components/friends/friends.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

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
  {path: `SignUp`, component: SignUpComponent},
  {path: `ForgotPassword`, component: ForgotPasswordComponent},
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
