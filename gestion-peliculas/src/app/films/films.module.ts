import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsRoutingModule } from './films-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ShowPageComponent } from './pages/show-page/show-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './pages/components/card/card.component';
import { FavoriteCardComponent } from './pages/components/favorite-card/favorite-card.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ShowPageComponent,
    SearchPageComponent,
    FavoritesPageComponent,
    CardComponent,
    FavoriteCardComponent,
    FavoriteCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FilmsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class FilmsModule { }
