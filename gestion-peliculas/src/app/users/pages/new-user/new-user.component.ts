import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Rol } from 'src/app/interfaces/rol';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CLOSE, INVALID_FORM } from '../../../shared/messages';
import { RolesService } from '../../services/roles.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styles: [
  ]
})
export class NewUserComponent implements OnInit {
  usuarioForm: FormGroup = new FormGroup({
    usuario: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    id_rol: new FormControl(null, [Validators.required]),
    nombre_publico: new FormControl(null),
    observaciones: new FormControl(null)
  });
  roles: Rol[]=[];

  constructor(
              private servicioRoles: RolesService,
              private servicioUsuario: UsersService,
              public snackBar: MatSnackBar,
              private router: Router
  ) { }

  ngOnInit() {
    this.getRoles();
  }

  async getRoles() {
    const RESPONSE = await this.servicioRoles.getAllRoles().toPromise();
    if (RESPONSE.ok) {
      this.roles = RESPONSE.data as Rol[];
    }
  }

  async confirmAdd() {
    // console.log(this.usuarioForm.value);
    if (this.usuarioForm.valid) {
        const usuario = this.usuarioForm.value;

        const RESP = await this.servicioUsuario.addUsuario(usuario).toPromise();
        if (RESP.ok) {
          this.snackBar.open("User added successfully", CLOSE, { duration: 5000 });
          this.router.navigate(['/users/list-user'])
        } else {
          this.snackBar.open("User was not added correctly ", CLOSE, { duration: 5000 });
        }
      } else {
        this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
      }
    }

}
