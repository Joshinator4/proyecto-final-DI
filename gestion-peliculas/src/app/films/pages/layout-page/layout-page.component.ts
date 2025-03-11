import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {
  userName: string = localStorage.getItem('usuario')!;
  urlRaiz = 'films';
  idRol:number = Number(localStorage.getItem('id_rol'));
  public sidebarItems = [
    {label: 'Search', icon: 'search', url:`${this.urlRaiz}/search`},
    {label: 'Favorites', icon: 'grade', url:`${this.urlRaiz}/favorites`},
  ]

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  onLogout(): void{
    this.authService.doLogout();
    this.router.navigate(['/'])
  }
}
