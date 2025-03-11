import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Error404PageRoutingModule } from './error404-page-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [Error404PageComponent],
  imports: [
    CommonModule,
    Error404PageRoutingModule,
    MaterialModule,
    RouterModule
  ]
})
export class Error404PageModule { }
