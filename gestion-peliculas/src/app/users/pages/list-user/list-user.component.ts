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

  constructor(
    private usersService: UsersService,
    private router: Router,
    ) { }
  ngOnInit() {
    this.getUsuarios();
  }

  async getUsuarios() {
    const RESPONSE = await this.usersService.getAllUsuarios().toPromise();
    if (RESPONSE.ok) {
      this.usersService.usuarios = RESPONSE.data
    }
  }

  get users(){
    return this.usersService.usuarios
  }

  onClick(){
    this.router.navigate(['/users/new-user'])
  }
}
