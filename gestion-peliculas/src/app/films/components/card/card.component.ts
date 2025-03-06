import { Component, Input } from '@angular/core';
import { Result } from 'src/app/interfaces/film.interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input()
  public film!: Result;

  ngOnInit(): void {
    if(!this.film) throw new Error('Film property is required');
  }

  get FilmImage(){
    return `https://image.tmdb.org/t/p/w1280/${this.film.backdrop_path}`
  }
}
