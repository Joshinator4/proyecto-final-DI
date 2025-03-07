import { Component, ElementRef, ViewChild } from '@angular/core';
import { FilmsService } from '../../services/films.service';
import { Film,} from 'src/app/interfaces/film.interfaces';

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

  constructor(private filmsService: FilmsService){

  }

  ngOnInit(): void {
    this.filmsService.getGenreList(); // Se realiza la búsqueda de los géneros para tenerlos ya cargados en el servicio y después poder mpostrar los géneros de cada film. Se carga en el ngOnInit para que asi se cargue una sola vez
  }

  buscarPelicula():void{
    const etiqueta = this.inputEtiqueta.nativeElement.value.trim();
    this.filmsService.buscarPelicula(etiqueta);
    this.inputEtiqueta.nativeElement.value = "";// se deja vacía el imput tras la búsqueda
  }

  get films(): Film[]{
    return this.filmsService.listaPeliculas;
  }

}
