import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavoritesService } from 'src/app/films/services/favorites.service';
import { FilmsService } from 'src/app/films/services/films.service';
import { Favorite } from 'src/app/interfaces/favorite.interface';
import { SpecificFilm } from 'src/app/interfaces/specificFilm.interface';
import { CLOSE } from 'src/app/shared/messages';

@Component({
  selector: 'films-favorite-card',
  templateUrl: './favorite-card.component.html',
  styles: [
  ]
})
export class FavoriteCardComponent implements OnInit{

  @Input() public favorite!: number;

  public film: SpecificFilm | undefined;

  public isLoading: boolean = true; // Controlador para manejar el estado de carga

  constructor(
              private filmService: FilmsService,
              private favoriteService: FavoritesService,
              public snackBar: MatSnackBar,

            ){}

  ngOnInit(): void {
    this.filmService.buscarPeliculaPorID(this.favorite)
    .subscribe(
      film => {this.film = film;
      this.isLoading = false; // Cambiar a false cuando la película esté cargada
      })
  }

  get FilmImage(){
    return this.filmService.getFilmImage(this.film!.backdrop_path);
  }

  async onDelete(){
    const RESPONSE = await this.favoriteService.deleteFavorite(this.film!.id, localStorage.getItem('token')!).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message ?? "Favorite deleted successfully", CLOSE, { duration: 5000 });
    } else { this.snackBar.open(RESPONSE.message ?? "Cant delete Favorite", CLOSE, { duration: 5000 }); }
  }

}
