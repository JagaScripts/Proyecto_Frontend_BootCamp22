import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Book } from 'src/app/models/book/book.model';
import { Valoracion } from 'src/app/models/valoracion/valoracion.model';

const BASEURLLIBRO = 'https://api-alquiler-de-libros-2022.herokuapp.com/api/valoracion';
//const BASEURLLIBRO = 'http://localhost:8181/api/libro';

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {

  constructor(private httpClient: HttpClient) { }

  list(): Observable<any[]> {
    return this.httpClient.get<Valoracion[]>(`${BASEURLLIBRO}`).pipe(
      catchError(this.handleError)
    );
  }

  listByBook(libro: Book): Observable<any[]> {
    // console.log(libro);
    // console.log(`${BASEURLLIBRO}/libro`);
    const bookId = {
      id: libro.id,
    };

    return this.httpClient.post<Valoracion[]>(`${BASEURLLIBRO}/libro`, bookId).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: string){
    return this.httpClient.get<Valoracion>(`${BASEURLLIBRO}/${id}`).pipe(
      catchError(this.handleError));
  }

  getByBookId(data: any){
    const bookId = {
      id: data
    }

    return this.httpClient.post<Valoracion>(`${BASEURLLIBRO}/libro`,bookId).pipe(catchError(this.handleError));
  }

  add(data: Valoracion){
    return this.httpClient.post<Valoracion>(`${BASEURLLIBRO}`,data).pipe(catchError(this.handleError));
  }

  update(id: any,data: any){
    return this.httpClient.put<Valoracion>(`${BASEURLLIBRO}/${id}`,data).pipe(catchError(this.handleError));
  }

  delete(id:any){
    return this.httpClient.delete<Valoracion>(`${BASEURLLIBRO}/${id}`).pipe(catchError(this.handleError));
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
