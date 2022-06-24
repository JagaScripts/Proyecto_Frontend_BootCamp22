import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Book } from 'src/app/models/book/book.model';

const baseUrlLibro = 'https://api-alquiler-de-libros-2022.herokuapp.com/api/libro';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) { }

  list(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${baseUrlLibro}`).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: string){
    return this.httpClient.get<any[]>(`${baseUrlLibro}/${id}`).pipe(
      catchError(this.handleError));
  }

  add(data: Book){
    return this.httpClient.post<Book>(`${baseUrlLibro}`,data).pipe(catchError(this.handleError));
  }

  delete(id:any){
    return this.httpClient.delete<Book>(`${baseUrlLibro}/${id}`,id).pipe(catchError(this.handleError));
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
