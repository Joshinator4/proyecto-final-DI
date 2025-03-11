import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

import { Rol } from 'src/app/interfaces/rol';
import { RolesService } from '../services/roles.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { CLOSE } from 'src/app/shared/messages';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'users-user-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit{

  @Input()public user!: Usuario;
  @Input()public index!: Number;


  constructor(private usersService: UsersService,
              private rolService: RolesService,
              private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    if(!this.user) throw new Error('User property is required');
  }

  onDeleteUser(){
    this.deleteUser().then(()=>{
      this.usersService.usuarios = this.usersService.usuarios.filter((element) => element.id_usuario !== this.user.id_usuario);
      console.log(this.usersService.usuarios)

    })
  }

  async deleteUser() {
    const RESP = await this.usersService.deleteUsuario(this.user!).toPromise();

    if (RESP.ok) {
      this.snackBar.open("User deleted", CLOSE, { duration: 5000 });
    } else {
      this.snackBar.open("Cant delete this user", CLOSE, { duration: 5000 });
    }
  }


}
