import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowPostComponent } from './show.component';
import { TemplateModule } from '../../../../modules/template/template.module';
import { SanitizeHtmlPipe } from '../../../../pipes/sanitize-html-pipe.pipe';

@NgModule({
  declarations: [ShowPostComponent, SanitizeHtmlPipe],
  imports: [
    CommonModule,
    TemplateModule
  ]
})
export class CpPostModule { }
