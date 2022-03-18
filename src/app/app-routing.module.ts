import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { StamComponent } from './components/stam/stam.component';
import { SecretGuard } from './guards/secret.guard';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TimelineComponent } from './components/timeline/timeline.component';
//import { MapComponent } from './components/map/map.component';

const routes: Routes = [

  {path: 'Main-page', component: MainPageComponent, children: [
    {path: 'Map', component: StamComponent},
    {path: 'Timeline', component: TimelineComponent},
    {path: '', redirectTo: 'Timeline', pathMatch: 'full'},
  ]},
  {path: `Stam`, component: StamComponent},
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
