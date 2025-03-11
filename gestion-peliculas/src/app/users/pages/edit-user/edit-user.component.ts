import { Component, OnInit } from '@angular/core';
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
export class EditUserComponent implements OnInit{
  public edit: boolean = false;
  public user?: Usuario;
  public rolList!: Rol[];
  public userForm:FormGroup = new FormGroup({
    id_usuario: new FormControl(null),
    usuario: new FormControl('', [Validators.required, Validators.email]),
    nombre_publico: new FormControl('', [Validators.required]),
    password: new FormControl(null),
    habilitado: new FormControl(null),
    id_rol: new FormControl(''),
    observaciones: new FormControl(''),
    rol: new FormControl('')
  });



    constructor(
      private usersService: UsersService,
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
          await this.getRoles();
          this.getUsuarios();
          this.user = this.usersService.usuarios.find(u => u.id_usuario == id);
          if(this.user){
            this.userForm.reset(this.user);
            this.edit = true;
          }
        }else{
          await this.getRoles();
        }
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    }

    get currentUser(){
      const user = this.userForm.value as Usuario;
      return user;
    }

    async getUsuarios() {
      const RESPONSE = await this.usersService.getAllUsuarios().toPromise();
      if (RESPONSE.ok) {
        this.usersService.usuarios = RESPONSE.data
      }
    }

    async getRoles() {
      const RESPONSE = await this.rolService.getAllRoles().toPromise();
      if (RESPONSE.ok) {
        this.rolList = RESPONSE.data as Rol[];
      }
    }

    async addUser(){
      if (this.userForm.valid) {
        const usuario = this.userForm.value;
        const RESP = await this.usersService.addUsuario(usuario).toPromise();
        console.log(RESP)
        if (RESP.ok) {
          this.snackBar.open("User created correctly", CLOSE, { duration: 5000 });
          this.router.navigate(['users/list-user'])
        } else {
          this.snackBar.open("Cant create user", CLOSE, { duration: 5000 });
        }
      } else {
        this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
      }
    }

    async confirmEdit() {
      if (this.userForm.valid) {
        const usuario = this.userForm.value;
        console.log(usuario)
        const RESP = await this.usersService.editUsuario(usuario).toPromise();
        if (RESP.ok) {
          this.snackBar.open("User saved correctly", CLOSE, { duration: 5000 });
          this.router.navigate(['users/list-user'])
        } else {
          this.snackBar.open("Cant saved correctly", CLOSE, { duration: 5000 });
        }
      } else {
        this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
      }
    }

    destroyUser(){
      this.deleteUser()
    }

    async deleteUser() {
      const RESP = await this.usersService.deleteUsuario(this.user!).toPromise();

      if (RESP.ok) {
        this.router.navigate(['/users/list-user'])
        this.snackBar.open("User deleted", CLOSE, { duration: 5000 });
      } else {
        this.snackBar.open("Cant delete this user", CLOSE, { duration: 5000 });
      }
    }

}
