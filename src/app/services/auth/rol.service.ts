import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private rol: any;
  private rol$: Subject<any>;

  constructor() {
    this.rol$ = new Subject();
  }

  addRol(rol: any){
    this.rol = rol;
    this.rol$.next(this.rol);
  }

  getRol$(): Observable<any> {
    return this.rol$.asObservable();
  }

}
