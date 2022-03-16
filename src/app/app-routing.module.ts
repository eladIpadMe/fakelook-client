import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { StamComponent } from './components/stam/stam.component';
import { SecretGuard } from './guards/secret.guard';
import { CreatePostComponent } from './create-post/create-post.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: `Stam`,
    component: StamComponent,
    canActivate: [SecretGuard],
  },
  {path: `Stam`, component: StamComponent},
  {path: `SignUp`, component: SignUpComponent},
  {path: `Login`, component: LoginComponent},
  {path: `createPost`, component: CreatePostComponent},
  {path: ``, component: LoginComponent},
  {path: `**`, component: LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
