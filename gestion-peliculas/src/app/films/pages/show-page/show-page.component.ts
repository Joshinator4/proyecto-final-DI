import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/interfaces/film.interfaces';
import { FilmsService } from '../../services/films.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap} from 'rxjs/operators';
import { Genre } from 'src/app/interfaces/genres.interfaces';
import { SpecificFilm } from 'src/app/interfaces/specificFilm.interface';
import { FavoritesService } from '../../services/favorites.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CLOSE, ERROR } from 'src/app/shared/messages';

@Component({
  selector: 'app-show-page',
  templateUrl: './show-page.component.html',
  styles: [
  ]
})
export class ShowPageComponent implements OnInit{

  public film!: SpecificFilm;
  public genreList!: Genre[];
  public isFavorite: boolean = false;

  constructor(
    private filmService: FilmsService,
    private snackBar: MatSnackBar,
    private favoritesService: FavoritesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){

  }

  volverAlListado(): void{
    this.router.navigate(['/films/search'])
  }

  ngOnInit(): void {
    this.getFavorites().then(()=>{

      this.activatedRoute.params.pipe(
        switchMap(({id}) => this.filmService.buscarPeliculaPorID(id))
      ).subscribe(film => {
        if(!film) return this.router.navigate(['/films/search']);
        this.film = film;

        console.log(this.favoritesService.favorites);
        console.log(this.film.id);
        this.favoritesService.getFavorites(localStorage.getItem('token')!);
        if(this.favoritesService.favorites.includes(this.film.id)){

          this.isFavorite = true
        }
        this.filmService.searchGenreList()
        .subscribe(
          resp =>{
            console.log(resp.genres),
            console.log(this.film.genres),
            this.genreList = resp.genres.filter((element) => this.film.genres.map(genre => genre.id).includes(element.id)) //como genres es un array de genre, se hace un mapeo para quedarnos solo con el id, y luego usar el includes con el id
          }
        )
        return;
      })
    })
  }

  async getFavorites(){
    const RESPONSE = await this.favoritesService.getFavorites(localStorage.getItem('token')!).toPromise();
    if(RESPONSE.ok){
      this.favoritesService.favorites = RESPONSE.data
    }
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

}
