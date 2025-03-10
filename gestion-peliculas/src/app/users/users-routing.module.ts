import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { ListUserComponent } from './pages/list-user/list-user.component';
import { LayoutPageComponent } from '../films/pages/layout-page/layout-page.component';

const routes: Routes = [
   {
      //localhost:4200/users/
      path: '',
      component: LayoutPageComponent,
      children: [
        {path: 'list-user' , component: ListUserComponent},
        {path: 'new-user' , component: EditUserComponent},
        {path: 'edit/:id' , component: EditUserComponent},//Ojo, la ruta con el :id debe estar al final del listado, ya que coincide con todas las rutas anteriores, y provocaría que nunca entráramos por ellas.
        {path: '**', redirectTo: 'search'}//wildcard que nos mande a la lista. El wildcard se activará cuando la ruta esté vacía, es decir, al llamar al módulo heroes de inicio.
      ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
