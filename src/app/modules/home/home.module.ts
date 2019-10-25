import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TemplateModule } from '../template/template.module'

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TemplateModule
  ]
})
export class HomeModule { }
