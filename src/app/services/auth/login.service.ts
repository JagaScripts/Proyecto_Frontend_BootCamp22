import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, Subject, pipe } from 'rxjs';
import { Token } from 'src/app/models/token/token.model';
import { User } from 'src/app/models/user/user.model';
import { Usuario } from 'src/app/models/usuario/usuario.model';

const baseUrl = 'https://api-alquiler-de-libros-2022.herokuapp.com/';
//const baseUrl = 'http://localhost:8181/';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private user!: any;
  private user$!: Subject<any>;

  constructor(private httpClient: HttpClient) {
    this.user$ = new Subject();
  }

  login(usuario: any): Observable<Token> {
    return this.httpClient.post<Token>(`${baseUrl}login`, usuario).pipe(
      catchError(this.handleError)
    );
  }

  getByName(username: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${baseUrl}usuario/username${username}`).pipe(
      catchError(this.handleError)
    );
  }

  add(user: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${baseUrl}usuario/`, user).pipe(
      catchError(this.handleError)
    );
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

  getUser$(): Observable<User>{
    return this.user$.asObservable();
  }

  setUser$(){
    this.user$.next(this.user);
  }


  setUser(usuario: any) {
    this.user = usuario;
  }

  getUser(): any {
    return this.user;
  }
}
