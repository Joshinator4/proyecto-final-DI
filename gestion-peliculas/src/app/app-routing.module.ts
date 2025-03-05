import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'films',
    loadChildren: () => import('./films/films.module').then(m=>m.FilmsModule)//esto añade el módulo por carga perezosa(LazyLoad)
  },
  /*{
    path: '404',
    component: Error404PageComponent
  },*/
  {
    path: '',
    redirectTo: 'films',
    pathMatch: 'full' //significa que la URL debe coincidir exactamente con la ruta especificada. Si hay una coincidencia parcial, la ruta no se activará.
  },
  /*{
    path: '**',
    redirectTo: '404'// (**) por si se introduce una ruta errónea, que redirija a 404
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
