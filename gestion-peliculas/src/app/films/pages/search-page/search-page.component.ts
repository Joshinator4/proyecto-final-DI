import { Component, ElementRef, ViewChild } from '@angular/core';
import { FilmsService } from '../../services/films.service';
import { Result } from 'src/app/interfaces/film.interfaces';
import { Genre } from 'src/app/interfaces/genres.interfaces';

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
    this.filmsService.getGenreList(); // Se carga una sola vez
  }

  buscarPelicula():void{
    const etiqueta = this.inputEtiqueta.nativeElement.value;
    this.filmsService.buscarPelicula(etiqueta);
    this.inputEtiqueta.nativeElement.value = "";
  }

  get films(): Result[]{
    return this.filmsService.listaPeliculas;
  }

  get genreList(): Genre[]{
    return this.filmsService.listaGeneros;
  }
}
