import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/interfaces/api-response';
import { Usuario } from 'src/app/interfaces/usuario';
import { CommonService } from 'src/app/shared/common.service';
import { URL_API } from 'src/environments/environment';

const ENDPOINT = 'usuario';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usuarios: Usuario[] = [];

  constructor(private http: HttpClient, private commonService: CommonService) {
  }

  getUsuarioByID(id: number, route?: string){
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id}`, { headers: this.commonService.headers });
  }

  getAllUsuarios() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  addUsuario(usuario: Usuario) {
    const body = JSON.stringify(usuario);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, {headers: this.commonService.headers });
  }

  editUsuario(usuario: Usuario, route?: string) {
    const body = JSON.stringify(usuario);

    if (route) {
      route = `?route=${route}`;
    } else {
      route = '';
    }

    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php${route}`, body, { headers: this.commonService.headers });
  }

  deleteUsuario(usuario: Usuario) {
    console.log(usuario)
    console.log(this.commonService.headers)
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${usuario.id_usuario}`, { headers: this.commonService.headers });
  }

  removeUsuario(idUser) {
    this.usuarios = this.usuarios.filter(usuario => {
      return Number(usuario.id_usuario) !== Number(idUser);
    });
  }

  /*updateUsuario(usuario: Usuario) {
    let index = null;
    this.usuarios.filter((usuarioFilter, indexFilter) => {
      if (usuario.id_usuario === usuarioFilter.id_usuario) {
        index = indexFilter;
      }
    });

    if (index) {
      this.usuarios[index] = usuario;
    }
  }*/

}
