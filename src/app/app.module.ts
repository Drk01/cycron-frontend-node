import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { reducer } from './reducers/index';

import { TemplateModule } from './modules/template/template.module';
import { CpHomeModule } from './modules/cp/home/home.module';
import { CpPostModule } from './modules/cp/posts/show/show.module';
import { HomeModule } from './modules/home/home.module';
import { LoginModule } from './modules/login/login.module';
import { RegisterModule } from './modules/register/register.module';
import { AboutModule } from './modules/about/about.module';
import { UsersComponent } from './modules/cp/users/users.component';
import { AdminPostComponent } from './modules/cp/posts/admin-post/admin-post.component';
import { TheBrainComponent } from './modules/the-brain/the-brain.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    TheBrainComponent,
    AdminPostComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ user: reducer }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TemplateModule,
    HomeModule,
    LoginModule,
    RegisterModule,
    AboutModule,

    CpHomeModule,
    CpPostModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
