import { Component, OnInit } from '@angular/core';
import { Favorite } from 'src/app/interfaces/favorite.interface';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styles: [
  ]
})
export class FavoritesPageComponent implements OnInit{

  constructor(private favoritesService: FavoritesService){}

  ngOnInit(): void {
    this.getFavorites()
  }

  async getFavorites(){
    const RESPONSE = await this.favoritesService.getFavorites(localStorage.getItem('token')!).toPromise();
    if(RESPONSE.ok){
      this.favoritesService.favorites = RESPONSE.data
    }
  }

  get favorites(){
    return this.favoritesService.favorites
  }


}
