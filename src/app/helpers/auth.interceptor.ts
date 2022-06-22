import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    if (token) {
      request = request.clone({
        setHeaders: {
          token,
        },
      });
      return request;
    }
    return request;
  }
}
