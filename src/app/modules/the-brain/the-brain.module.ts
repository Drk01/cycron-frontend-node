import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheBrainComponent } from './the-brain.component';
import { TemplateModule } from '../template/template.module'


@NgModule({
  declarations: [
    TheBrainComponent
  ],
  imports: [
    CommonModule,
    TemplateModule
  ]
})
export class TheBrainModule { }
