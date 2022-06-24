import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Rol } from 'src/app/models/rol/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private rol!: Rol;
  private rol$!: Subject<Rol>;

  constructor() {
    this.rol$ = new Subject();
  }

  addUser(rol: Rol){
    this.rol = rol;
    this.rol$.next(this.rol);
  }

  getRol$(): Observable<Rol> {
    return this.rol$.asObservable();
  }

}
