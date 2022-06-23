import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = `Authorization`;

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = this.addToken(request);
    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>) {
    const token = window.sessionStorage.getItem("auth-token");
    console.log(token, ' token');
    if (token != null) {
      request = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
      console.log(request.headers.getAll(TOKEN_HEADER_KEY) + " petición");
      console.log(request.url + " petición");
      return request;
    }
    return request;
  }
}
