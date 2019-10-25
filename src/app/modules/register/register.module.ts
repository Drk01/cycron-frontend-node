import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterSuccessComponent } from './success/success.component'
import { TemplateModule } from '../template/template.module';


@NgModule({
  declarations: [RegisterComponent, RegisterSuccessComponent],
  imports: [
    CommonModule,
    TemplateModule
  ]
})
export class RegisterModule { }
