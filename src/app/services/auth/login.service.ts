import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, Subject } from 'rxjs';
import { Usuario } from 'src/app/models/usuario/usuario.model';

const baseUrl = 'https://api-alquiler-de-libros-2022.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private user!: Usuario;
  private user$!: Subject<Usuario>;

  constructor(private httpClient: HttpClient) {
    this.user$ = new Subject();
  }

  login(usuario: Usuario): Observable<Usuario> {
    this.user = usuario;
    this.user$.next(this.user);
    return this.httpClient.post<Usuario>(`${baseUrl}/login`, usuario).pipe(
      catchError(this.handleError)
    )
  }

   // Handle API errors
   handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
