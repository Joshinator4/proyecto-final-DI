import { Component, Input, OnInit } from '@angular/core';
import { Film } from 'src/app/interfaces/film.interfaces';
import { Genre } from 'src/app/interfaces/genres.interfaces';
import { FilmsService } from '../../../services/films.service';
import { FavoritesService } from 'src/app/films/services/favorites.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CLOSE, ERROR } from 'src/app/shared/messages';


@Component({
  selector: 'films-film-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit{

  @Input()
  public film!: Film;
  public isFavorite: boolean = false;
  public genreList!: Genre[];

  constructor(private filmService: FilmsService,
              private favoritesService: FavoritesService,
              public snackBar: MatSnackBar,
  ){}

  ngOnInit(): void {
    if(!this.film) throw new Error('Film property is required');
    this.genreList = this.filmService.listaGeneros.filter((element) => this.film.genre_ids.includes(element.id));
    if(this.favoritesService.favorites.includes(this.film.id)){
      this.isFavorite = true
    }
  }

  get FilmImage(){
    return this.filmService.getFilmImage(this.film.backdrop_path);
  }

  async onDelete(){
      let correct = await this.favoritesService.onDeleteFavorite(this.film!.id)
      if (correct) {
        this.snackBar.open("Favorite deleted successfully", CLOSE, { duration: 5000 });
        this.isFavorite = false;
      } else { this.snackBar.open("Cant delete Favorite", CLOSE, { duration: 5000 }); }

    }

    deleteFavorites(){
      this.onDelete()
    }

    addFavoriteFilm(){
        this.addFavorite();
      }

      async addFavorite(){
        this.isFavorite= true
        let correct = await this.favoritesService.addFavoriteFilm(this.film.id);
        if (correct) {
          this.snackBar.open("Favorite added successfully", CLOSE, { duration: 5000 });
        } else {
            this.snackBar.open(ERROR, CLOSE, { duration: 5000 });
        }

      }
}
