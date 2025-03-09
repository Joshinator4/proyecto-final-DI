import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styles: [
  ]
})
export class ListUserComponent implements OnInit{

  users: Usuario[] = [];

  constructor(
    private servicioUsuarios: UsersService,
    private router: Router,
    ) { }
  ngOnInit() {
    this.getUsuarios();
  }

  async getUsuarios() {
    const RESPONSE = await this.servicioUsuarios.getAllUsuarios().toPromise();
    if (RESPONSE.ok) {
      console.log(RESPONSE.data)
      this.users = RESPONSE.data
      this.servicioUsuarios.usuarios = RESPONSE.data
      console.log(this.servicioUsuarios.usuarios)
    }
  }


  onClick(){
    this.router.navigate(['/users/new-user'])
  }
}
