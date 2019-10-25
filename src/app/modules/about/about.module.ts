import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { TemplateModule } from '../template/template.module'


@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    TemplateModule
  ]
})
export class AboutModule { }
