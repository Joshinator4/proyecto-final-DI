import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from 'src/app/films/pages/layout-page/layout-page.component';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';

const routes: Routes = [
  {
      //localhost:4200/404/
      path: '',
      component: LayoutPageComponent,
      children: [
        {path: 'error404' , component: Error404PageComponent},
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Error404PageRoutingModule { }
