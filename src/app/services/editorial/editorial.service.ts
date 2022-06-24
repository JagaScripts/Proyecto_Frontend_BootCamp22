import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Editorial } from 'src/app/models/editorial/editorial.model';

const BASE_URL_EDITORIAL = 'https://api-alquiler-de-libros-2022.herokuapp.com/api/editorial';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {

  constructor(private httpClient: HttpClient) { }

  list(): Observable<Editorial[]> {
    return this.httpClient.get<Editorial[]>(`${BASE_URL_EDITORIAL}`).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: number){
    return this.httpClient.get<Editorial[]>(`${BASE_URL_EDITORIAL}/${id}`).pipe(
      catchError(this.handleError));
  }

  add(editorial: Editorial){
    return this.httpClient.post<Editorial>(`${BASE_URL_EDITORIAL}`, editorial).pipe(catchError(this.handleError));
  }

  update(id: number, editorial: Editorial){
    return this.httpClient.put<Editorial>(`${BASE_URL_EDITORIAL}`, id ,editorial).pipe(catchError(this.handleError));
  }

  delete(id: number){
    return this.httpClient.delete<Editorial>(`${BASE_URL_EDITORIAL}/${id}`).pipe(catchError(this.handleError));
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
