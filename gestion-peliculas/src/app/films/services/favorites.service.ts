import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from 'src/environments/environment';
import { ApiResponse } from 'src/app/interfaces/api-response';
import { CommonService } from 'src/app/shared/common.service';
import { Favorite } from 'src/app/interfaces/favorite.interface';
import { Observable } from 'rxjs';

const ENDPOINT = 'favorito';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  favorites: number[]=[];

  constructor(private http: HttpClient, private commonService: CommonService) { }

  getFavorites(token: string){
    const encodedToken = btoa(token);
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?token=${encodedToken}`, { headers: this.commonService.headers });
  }
  addFavorite(id: number, token: string) {
    const body = JSON.stringify(token);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id}`, body, { headers: this.commonService.headers });
  }
  deleteFavorite(id: number, token: string) {
    const encodedToken = btoa(token);
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id}&token=${encodedToken}`, { headers: this.commonService.headers });
  }

  async onDelete(film_id: number){
      const RESPONSE = await this.deleteFavorite(film_id, localStorage.getItem('token')!).toPromise();
      if (RESPONSE.ok) {
        return true;
      } else {
        return false;
      }
    }

  onDeleteFavorite(film_id: number){
    this.favorites = this.favorites.filter((element)=> element !== film_id);
    return this.onDelete(film_id);
  }

  onAddFavorite(film_id: number){
    this.addFavoriteFilm(film_id);
  }

  async addFavoriteFilm(film_id: number){
    const RESPONSE = await this.addFavorite(film_id, localStorage.getItem('token')!).toPromise();
    if (RESPONSE.ok) {
      return true;
    } else {
        return false;
    }
  }

}
