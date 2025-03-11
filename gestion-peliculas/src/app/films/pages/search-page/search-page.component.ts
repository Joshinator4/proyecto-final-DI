import { Component, ElementRef, ViewChild } from '@angular/core';
import { FilmsService } from '../../services/films.service';
import { Film,} from 'src/app/interfaces/film.interfaces';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  @ViewChild('txtInputTitulo')//esto coge el valor de la etiqueta generada en el html #txtInputEtiqueta
  public inputEtiqueta!: ElementRef<HTMLInputElement>; //esto recibe el elemento que hay en el input del html
  //si no se pone la exclamación da error. la exclamación indica a angular que va a tener un valor si o si, por eso no hay que inicializarla

  public inicio = true;
  constructor(private filmsService: FilmsService,
              private favoritesService: FavoritesService,
  ){}

  ngOnInit(): void {
    this.filmsService.getGenreList(); // Se realiza la búsqueda de los géneros para tenerlos ya cargados en el servicio y después poder mpostrar los géneros de cada film. Se carga en el ngOnInit para que asi se cargue una sola vez
    this.getFavorites()
  }

  async getFavorites(){
    const RESPONSE = await this.favoritesService.getFavorites(localStorage.getItem('token')!).toPromise();
    if(RESPONSE.ok){
      this.favoritesService.favorites = RESPONSE.data
    }
  }

  buscarPelicula():void{
    const etiqueta = this.inputEtiqueta.nativeElement.value.trim();
    if(etiqueta == ""){
          window.alert("No se admiten busquedas vacías");
          return;
        }
    this.filmsService.buscarPelicula(etiqueta);

    this.inputEtiqueta.nativeElement.value = "";// se deja vacía el imput tras la búsqueda
    setTimeout(() => {
      this.inicio = false;
    },500);

  }

  get films(): Film[]{
    return this.filmsService.listaPeliculas;
  }

}
