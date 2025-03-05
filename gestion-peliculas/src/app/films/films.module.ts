import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsRoutingModule } from './films-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ShowPageComponent } from './pages/show-page/show-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ShowPageComponent,
    SearchPageComponent,
    FavoritesPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FilmsRoutingModule
  ]
})
export class FilmsModule { }
