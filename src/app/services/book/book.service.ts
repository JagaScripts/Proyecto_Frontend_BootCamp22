import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Book } from 'src/app/models/book/book.model';

const BASEURLLIBRO = 'https://api-alquiler-de-libros-2022.herokuapp.com/api/libro';
//const BASEURLLIBRO = 'http://localhost:8181/api/libro';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) { }

  list(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${BASEURLLIBRO}`).pipe(
      catchError(this.handleError)
    );
  }

  getById(id: string){
    return this.httpClient.get<Book>(`${BASEURLLIBRO}/${id}`).pipe(
      catchError(this.handleError));
  }

  add(data: Book){
    return this.httpClient.post<Book>(`${BASEURLLIBRO}`,data).pipe(catchError(this.handleError));
  }

  update(id: any,data: Book){
    const updatelibro = {
      id: data.id,
      autor: data.autor,
      titulo: data.titulo,
      isbn: data.isbn,
      edad: data.edad,
      categoria: data.categoria,
      cantidad_veces_reservado: data.cantidad_veces_reservado,
      url_img: data.url_img,
      descripcion: data.descripcion,
      disponible:data.disponible,
      editorial: {
        id:data.editorial.id,
        nombre:data.editorial.nombre
      }
    };


    return this.httpClient.put<Book>(`${BASEURLLIBRO}/${id}`,updatelibro).pipe(catchError(this.handleError));
  }

  delete(id:any){
    return this.httpClient.delete<Book>(`${BASEURLLIBRO}/${id}`).pipe(catchError(this.handleError));
  }
    // Handle API errors
    handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.log('An error occurred:', error.error.message);
      } else {
       // console.log(          `Backend returned code ${error.status}, ` +`body was: ${error.error}`);
       console.log(error.status);
      }
      return throwError(
        'Something bad happened; please try again later.');
    };
}
