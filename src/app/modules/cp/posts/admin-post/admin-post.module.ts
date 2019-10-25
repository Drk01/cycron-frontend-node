import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPostComponent } from './admin-post.component';
import { TemplateModule } from '../../../template/template.module'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {FormsModule} from '@angular/forms'
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [AdminPostComponent],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    TemplateModule,
    FormsModule,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    CKEditorModule
  ]
})
export class AdminPostModule { }
