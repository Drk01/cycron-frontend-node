import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from '../../components/template/navbar/navbar.component';
import { PreloaderComponent } from '../../components/template/preloader/preloader.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NavbarComponent,
    PreloaderComponent
  ],
  exports: [
    NavbarComponent,
    PreloaderComponent
  ]
})
export class TemplateModule { }
