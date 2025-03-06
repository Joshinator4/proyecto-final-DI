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
    {label: 'Search', icon: 'search', url:`${this.urlRaiz}/search`},
    {label: 'Favorites', icon: 'grade', url:`${this.urlRaiz}/favorites`},
  ]
}
