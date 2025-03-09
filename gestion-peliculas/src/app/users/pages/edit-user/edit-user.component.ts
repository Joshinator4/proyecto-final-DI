import { Component } from '@angular/core';
import { Rol } from 'src/app/interfaces/rol';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { RolesService } from '../../services/roles.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CLOSE, INVALID_FORM } from 'src/app/shared/messages';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styles: [
  ]
})
export class EditUserComponent {
  public user!: Usuario;
  public rolList!: Rol[];
  public userForm:FormGroup = new FormGroup([]);



    constructor(
      private userService: UsersService,
      private rolService: RolesService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      public snackBar: MatSnackBar,
    ){

    }

    volverAlListado(): void{
      this.router.navigate(['/users/list-user'])
    }

    async ngOnInit() {
      try {
        // Obtenemos el ID de la URL
        const id = this.activatedRoute.snapshot.params['id'];
        if (id) {
          this.getUsuarios();
          this.user = this.userService.usuarios[id];
          console.log(this.user)
        }
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    }

    async getUsuarios() {
      const RESPONSE = await this.userService.getAllUsuarios().toPromise();
      if (RESPONSE.ok) {
        this.userService.usuarios = RESPONSE.data
      }
    }

    async getUsuarioById(id: number, route?: string) {
      const RESPONSE = await this.userService.getUsuarioByID(id).toPromise();
      if (RESPONSE.ok) {
        console.log(RESPONSE.data)
        this.user = RESPONSE.data
        console.log(this.user)
        this.userForm = new FormGroup({
          id_usuario: new FormControl(this.user.id_usuario, [Validators.required]),
          usuario: new FormControl(this.user.usuario, [Validators.required, Validators.email]),
          nombre_publico: new FormControl(this.user.nombre_publico),
          password: new FormControl(''),
          habilitado: new FormControl(Number(this.user.habilitado) === 1, [Validators.required]),
          id_rol: new FormControl(this.user.id_rol, [Validators.required]),
          observaciones: new FormControl(this.user.observaciones),
          rol: new FormControl(this.user.rol, [Validators.required])
        });
      }
    }

    async getRoles() {
      const RESPONSE = await this.rolService.getAllRoles().toPromise();
      if (RESPONSE.ok) {
        this.rolList = RESPONSE.data as Rol[];
      }
    }

    async confirmEdit() {
      if (this.userForm.valid) {
        const usuario = this.userForm.value;

        const RESP = await this.userService.editUsuario(usuario).toPromise();
        if (RESP.ok) {
          this.snackBar.open("User edited correctly", CLOSE, { duration: 5000 });
        } else {
          this.snackBar.open("Cant edit user", CLOSE, { duration: 5000 });
        }
      } else {
        this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
      }
    }

    async deleteUser(usuario: Usuario) {
      const RESP = await this.userService.deleteUsuario(usuario).toPromise();
      if (RESP.ok) {
        this.snackBar.open("User deleted", CLOSE, { duration: 5000 });
      } else {
        this.snackBar.open("Cat delete this user", CLOSE, { duration: 5000 });
      }
    }

}
