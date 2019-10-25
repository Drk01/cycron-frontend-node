import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './modules/home/home.component'
import { LoginComponent } from './modules/login/login.component'
import { RegisterComponent } from './modules/register/register.component'
import { RegisterSuccessComponent } from './modules/register/success/success.component'
import { AboutComponent } from './modules/about/about.component'

import { CpHomeComponent } from './modules/cp/home/home.component'
import { ShowPostComponent } from './modules/cp/posts/show/show.component'

import { UsersComponent } from './modules/cp/users/users.component'
import { AdminPostComponent } from './modules/cp/posts/admin-post/admin-post.component'

import { TheBrainComponent } from './modules/the-brain/the-brain.component'



const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'register/success',
    component: RegisterSuccessComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },

  {
    path: 'cp',
    component: CpHomeComponent
  },
  {
    path: 'cp/post/:id/:slug',
    component: ShowPostComponent
  },
   {
    path: 'cp/user',
    component: UsersComponent
  },
  {
    path: 'cp/admin-post',
    component: AdminPostComponent
  },
  {
    path: 'the-brain',
    component: TheBrainComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
