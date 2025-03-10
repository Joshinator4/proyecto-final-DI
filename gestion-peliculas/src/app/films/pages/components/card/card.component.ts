import { Component, Input, OnInit } from '@angular/core';
import { Film } from 'src/app/interfaces/film.interfaces';
import { Genre } from 'src/app/interfaces/genres.interfaces';
import { FilmsService } from '../../../services/films.service';


@Component({
  selector: 'films-film-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit{

  @Input()
  public film!: Film;

  public genreList!: Genre[];

  constructor(private filmService: FilmsService){}

  ngOnInit(): void {
    if(!this.film) throw new Error('Film property is required');
    this.genreList = this.filmService.listaGeneros.filter((element) => this.film.genre_ids.includes(element.id));
  }

  get FilmImage(){
    return this.filmService.getFilmImage(this.film.backdrop_path);
  }
}
