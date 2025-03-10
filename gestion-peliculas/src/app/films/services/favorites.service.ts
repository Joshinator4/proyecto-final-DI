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
}
