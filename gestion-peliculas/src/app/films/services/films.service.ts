import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ConcreteFilm } from 'src/app/interfaces/concreteFilm.interface';
import { Film, SearchResponse } from 'src/app/interfaces/film.interfaces';
import { Genre, Genres } from 'src/app/interfaces/genres.interfaces';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  public listaGeneros: Genre[] = [];
  public listaPeliculas: Film[] = [];
  private apiKey: string = '75619e68d51d07c77caa2da60519d5dd';//esto es la clave generada de la aplicacion de thmoviedb
  private serviceUrl: string = "https://api.themoviedb.org/3"//esta es el principio de la url de themoviedb para buscar las peículas

  constructor(private httpClient: HttpClient) { }

  buscarPelicula(titulo:string){
    if(titulo == ""){
      window.alert("No se admiten busquedas vacías");
      return;
    }
    const params = new HttpParams() //!Con esto podemos generar los parametros de un http. generará algo asi como ?api_key=75619e68d51d07c77caa2da60519d5dd&limit=10&q=(lo que entre por etiqueta)
                    .set('query', titulo)
                    .set('language', 'en-US')
                    .set('page', 1)
                    .set('include_adult', false)
                    .set('api_key', this.apiKey);

    this.httpClient.get<SearchResponse>(`${ this.serviceUrl }/search/movie`, { params })
      .subscribe( resp => {
        this.listaPeliculas = resp.results
      })
  }
  buscarPeliculaPorID(id:number): Observable<ConcreteFilm | undefined> {
    const params = new HttpParams()
                    .set('language', 'en-US')
                    .set('api_key', this.apiKey);

    return this.httpClient.get<ConcreteFilm>(`${ this.serviceUrl }/movie/${id}`, { params }).pipe(catchError(error => of(undefined)))
  }

  getGenreList(){
    const params = new HttpParams()
                    .set('language', 'en-US')
                    .set('api_key', this.apiKey);

    this.httpClient.get<Genres>(`${ this.serviceUrl }/genre/movie/list`, { params })
      .subscribe(resp => {
        this.listaGeneros = resp.genres
      })

  }

  searchGenreList(): Observable<Genres>{
    const params = new HttpParams()
                    .set('language', 'en-US')
                    .set('api_key', this.apiKey);
    return this.httpClient.get<Genres>(`${ this.serviceUrl }/genre/movie/list`, { params })
  }

}
