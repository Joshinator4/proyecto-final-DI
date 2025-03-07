import { Component, Input } from '@angular/core';
import { Film } from 'src/app/interfaces/film.interfaces';
import { Genre } from 'src/app/interfaces/genres.interfaces';
import { FilmsService } from '../../services/films.service';


@Component({
  selector: 'fimls-film-card',
  templateUrl: './card.component.html',
})
export class CardComponent {

  @Input()public film!: Film;

  public genreList!: Genre[];

  constructor(private filmService: FilmsService){}

  ngOnInit(): void {
    if(!this.film) throw new Error('Film property is required');
    this.genreList = this.filmService.listaGeneros.filter((element) => this.film.genre_ids.includes(element.id));
  }

  get FilmImage(){
    if(this.film.backdrop_path == null){
      return 'https://www.ucm.es/icae/file/no-image-available/?ver'
    }
    return `https://image.tmdb.org/t/p/w1280/${this.film.backdrop_path}`
  }
}
