import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from 'src/app/shared/common.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  });
  showPasswordField = false;
  loading = false;
  isLoading = false;  // variable para el spinner

  constructor(private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private snackBar: MatSnackBar,
    private commonService: CommonService) {
  }

  verifyEmail() {
    if (this.loginForm.get('email')?.invalid) {
      this.loginForm.get('email')?.markAsTouched();
      return;
    }
    this.isLoading = true; // Mostrar spinner
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.showPasswordField = true;
      this.isLoading = false; // Mostrar spinner
    }, 2000); // Simulate API delay
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.acceder();
  }

  async acceder() {

    if (this.loginForm.valid) {

      const data = this.loginForm.value;
      console.log(data)
      const RESPONSE = await this.authService.doLogin(data).toPromise();

      console.log(RESPONSE);
      if (RESPONSE.ok) {
        console.log(RESPONSE.data.token);
        if (RESPONSE.data.token) {
          this.cookieService.set('token', RESPONSE.data.token);
          // console.log('ya he puesto el token');
          localStorage.setItem('token', RESPONSE.data.token);
          localStorage.setItem('usuario', RESPONSE.data.usuario);
          localStorage.setItem('nombre_publico', RESPONSE.data.nombre_publico);
          localStorage.setItem('id_rol', RESPONSE.data.id_rol);
          this.commonService.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${RESPONSE.data.token}`
          });
          this.router.navigate([`/films/search`]);

        } else if (RESPONSE.data.valido === 0) {
          this.snackBar.open('Disabled user', 'Close', {duration: 5000});
        } else if (RESPONSE.data.valido === 1) {
          this.showPasswordField = false;
          this.snackBar.open('User or password are invalids', 'Close', {duration: 5000});
        }
      }
    }
  }

}
