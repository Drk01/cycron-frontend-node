import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { TemplateModule } from '../template/template.module'

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    TemplateModule
  ]
})
export class LoginModule { }
