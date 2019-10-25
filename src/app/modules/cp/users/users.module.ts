import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { TemplateModule } from '../../template/template.module'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {FormsModule} from '@angular/forms'

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    TemplateModule,
    FormsModule
  ]
})
export class UsersModule { }
