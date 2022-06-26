import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Usuario } from 'src/app/models/usuario/usuario.model';


const BASEURLLIBRO = 'https://api-alquiler-de-libros-2022.herokuapp.com/usuario';
//const BASEURLLIBRO = 'http://localhost:8181/api/libro';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }

  list(): Observable<any[]> {
    return this.httpClient.get<Usuario[]>(`${BASEURLLIBRO}`).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: string){
    return this.httpClient.get<Usuario>(`${BASEURLLIBRO}/${id}`).pipe(
      catchError(this.handleError));

  }
  getByUsername(username: string){
    return this.httpClient.get<Usuario>(`${BASEURLLIBRO}/username/${username}`).pipe(
      catchError(this.handleError));
  }

  add(data: Usuario){
    return this.httpClient.post<Usuario>(`${BASEURLLIBRO}`,data).pipe(catchError(this.handleError));
  }

  update(id: any,data: any){
    return this.httpClient.put<Usuario>(`${BASEURLLIBRO}/${id}`,data).pipe(catchError(this.handleError));
  }

  delete(id:any){
    return this.httpClient.delete<Usuario>(`${BASEURLLIBRO}/${id}`).pipe(catchError(this.handleError));
  }
    // Handle API errors
    handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.log('An error occurred:', error.error.message);
      } else {
        console.log(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      return throwError(
        'Something bad happened; please try again later.');
    };
}
