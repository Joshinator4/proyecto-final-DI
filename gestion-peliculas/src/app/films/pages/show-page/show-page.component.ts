import { Component } from '@angular/core';
import { Film } from 'src/app/interfaces/film.interfaces';
import { FilmsService } from '../../services/films.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Genre } from 'src/app/interfaces/genres.interfaces';
import { ConcreteFilm } from 'src/app/interfaces/concreteFilm.interface';

@Component({
  selector: 'app-show-page',
  templateUrl: './show-page.component.html',
  styles: [
  ]
})
export class ShowPageComponent {

  public film!: ConcreteFilm;
  public genreList!: Genre[];
  constructor(
    private filmService: FilmsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){

  }

  volverAlListado(): void{
    this.router.navigate(['/films/search'])
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(({id}) => this.filmService.buscarPeliculaPorID(id))
    ).subscribe(film => {
      if(!film) return this.router.navigate(['/films/search']);
      this.film = film;
      return;
    })
    this.filmService.searchGenreList()
      .subscribe(
        resp =>{
          console.log(resp.genres),
          console.log(this.film.genres)
          this.genreList = resp.genres.filter((element) => this.film.genres.map(genre => genre.id).includes(element.id)) //como genres es un array de genre, se hace un mapeo para quedarnos solo con el id, y luego usar el includes con el id
        }
      )

  }

  get FilmImage(){
    if(!this.film){
      return;
    }
    if(this.film.poster_path == null){
      return 'https://www.ucm.es/icae/file/no-image-available/?ver'
    }
    return `https://image.tmdb.org/t/p/w1280/${this.film.poster_path}`
  }
  ProductionImage(logo_path: string){
    if(!this.film){
      return;
    }
    if(this.film.production_companies == null){
      return 'Known production companies';
    }
    if(logo_path == null){
      return 'https://www.ucm.es/icae/file/no-image-available/?ver'
    }
    return `https://image.tmdb.org/t/p/w200${logo_path}`
  }

}
