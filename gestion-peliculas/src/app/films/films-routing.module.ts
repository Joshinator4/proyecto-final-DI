import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ShowPageComponent } from './pages/show-page/show-page.component';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';

const routes: Routes = [
  {
    //localhost:4200/films/
    path: '',
    component: LayoutPageComponent,
    children: [
      {path: 'search' , component: SearchPageComponent},
      {path: 'favorites' , component: FavoritesPageComponent},
      {path: ':id' , component: ShowPageComponent},//Ojo, la ruta con el :id debe estar al final del listado, ya que coincide con todas las rutas anteriores, y provocaría que nunca entráramos por ellas.
      {path: '**', redirectTo: 'search'}//wildcard que nos mande a la lista. El wildcard se activará cuando la ruta esté vacía, es decir, al llamar al módulo heroes de inicio.
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }
