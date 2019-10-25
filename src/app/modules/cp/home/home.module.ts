import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwlModule } from 'ngx-owl-carousel';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CpHomeComponent } from './home.component';
import { TemplateModule } from '../../template/template.module'

@NgModule({
  declarations: [CpHomeComponent],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    TemplateModule,
    OwlModule
  ]
})
export class CpHomeModule { }
