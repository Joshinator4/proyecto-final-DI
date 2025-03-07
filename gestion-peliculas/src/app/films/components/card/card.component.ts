import { Component, Input } from '@angular/core';
import { Result } from 'src/app/interfaces/film.interfaces';
import { Genre } from 'src/app/interfaces/genres.interfaces';


@Component({
  selector: 'fimls-film-card',
  templateUrl: './card.component.html',
})
export class CardComponent {

  @Input()public film!: Result;

  @Input()public genreList!: Genre[];

  public listaGeneros: Genre[]=[];

  constructor(){}

  ngOnInit(): void {
    if(!this.film) throw new Error('Film property is required');
    console.log(this.film.genre_ids)
    console.log(this.genreList)

    this.listaGeneros = this.genreList.filter((element) => this.film.genre_ids.includes(element.id));
  }

  get FilmImage(){
    if(this.film.backdrop_path == null){
      return 'https://www.ucm.es/icae/file/no-image-available/?ver'
    }
    return `https://image.tmdb.org/t/p/w1280/${this.film.backdrop_path}`
  }


}
