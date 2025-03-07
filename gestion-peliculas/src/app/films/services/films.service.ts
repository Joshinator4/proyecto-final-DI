import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result, SearchResponse } from 'src/app/interfaces/film.interfaces';
import { Genre, Genres } from 'src/app/interfaces/genres.interfaces';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  public listaGeneros: Genre[] = [];
  public listaPeliculas: Result[] = [];
  private apiKey: string = '75619e68d51d07c77caa2da60519d5dd';//esto es la clave generada de la aplicacion de thmoviedb
  private serviceUrl: string = "https://api.themoviedb.org/3"//esta es el principio de la url de themoviedb para buscar las peículas

  constructor(private httpClient: HttpClient) { }

  buscarPelicula(titulo:string){
    if(titulo == ""){
      window.alert("No se admiten busquedas vacías");
      return;
    }
    const params = new HttpParams() //!Con esto podemos generar los parametros de un http. generará algo asi como ?api_key=wVtABfpJzq2QKtUoCSHivJNQVlUtJKP9&limit=10&q=(lo que entre por etiqueta)
                    .set('query', titulo)
                    .set('language', 'en-US')
                    .set('page', 1)
                    .set('include_adult', false)
                    .set('api_key', this.apiKey);

    this.httpClient.get<SearchResponse>(`${ this.serviceUrl }/search/movie`, { params })
      .subscribe( resp => {
        this.listaPeliculas = resp.results
        console.log({films: this.listaPeliculas})
      })
  }

  getGenreList(){
    const params = new HttpParams() //!Con esto podemos generar los parametros de un http. generará algo asi como ?api_key=wVtABfpJzq2QKtUoCSHivJNQVlUtJKP9&limit=10&q=(lo que entre por etiqueta)
                    .set('language', 'en-US')
                    .set('api_key', this.apiKey);

    if(this.listaGeneros.length > 0){

    }
    this.httpClient.get<Genres>(`${ this.serviceUrl }/genre/movie/list`, { params })
      .subscribe(resp => {
        this.listaGeneros = resp.genres
        console.log(this.listaGeneros)
      })

  }

}
