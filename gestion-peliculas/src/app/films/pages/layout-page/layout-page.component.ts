import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {
  urlRaiz = 'films';
  public sidebarItems = [
    {label: 'Listado', icon: 'label', url:`${this.urlRaiz}/list`},

    {label: 'Añadir', icon: 'add', url:`${this.urlRaiz}/new-hero`},
    {label: 'Buscar', icon: 'search', url:`${this.urlRaiz}/search`}
  ]
}
