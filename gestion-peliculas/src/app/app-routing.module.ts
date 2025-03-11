import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateGuard, canMatchGuard } from './guards/auth.guard';
import { canActivateGuardPublic, canMatchGuardPublic } from './guards/public.guard';
import { canActivateGuardUser } from './guards/users.guard';
import { Error404PageComponent } from './shared/error404-page/pages/error404-page/error404-page.component';
//import { canActivateGuardPublic, canMatchGuardPublic } from './guards/public.guard';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./home/home.module').then(m=>m.HomeModule),//esto añade el módulo por carga perezosa(LazyLoad)
    canMatch: [canMatchGuardPublic],
    canActivate: [canActivateGuardPublic]
  },
  {
    path: 'films',
    loadChildren: () => import('./films/films.module').then(m=>m.FilmsModule),//esto añade el módulo por carga perezosa(LazyLoad)
    canActivate: [canActivateGuard],
    canMatch: [canMatchGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m=>m.UsersModule),//esto añade el módulo por carga perezosa(LazyLoad)
    canActivate: [canActivateGuard, canActivateGuardUser],
    canMatch: [canMatchGuard, canActivateGuardUser]
  },
  {
    path: '404',
    loadChildren: () => import('./shared/error404-page/error404-page.module').then(m=>m.Error404PageModule),//esto añade el módulo por carga perezosa(LazyLoad)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full' //significa que la URL debe coincidir exactamente con la ruta especificada. Si hay una coincidencia parcial, la ruta no se activará.
  },
  {
    path: '**',
    redirectTo: '404/error404'// (**) por si se introduce una ruta errónea, que redirija a 404
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
