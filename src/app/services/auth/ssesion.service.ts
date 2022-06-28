import { Injectable } from '@angular/core';
import { Ssesionkeys } from 'src/app/models/enum/ssesionkeys/ssesionkeys.model';
import { Ssesion } from 'src/app/models/ssesion/ssesion.model';



@Injectable({
  providedIn: 'root'
})
export class SsesionService {

  constructor() { }

  signOut(): void{
    window.sessionStorage.clear();
  }

  public saveSession(ssesion: Ssesion){
    window.sessionStorage.setItem(Ssesionkeys.token, ssesion.token);
    window.sessionStorage.setItem(Ssesionkeys.rol, ssesion.rol);
    window.sessionStorage.setItem(Ssesionkeys.username, ssesion.username);
  }

  public getSession(): any {
    const ssesion = {
      username: window.sessionStorage.getItem(Ssesionkeys.username),
      token: window.sessionStorage.getItem(Ssesionkeys.token),
      rol: window.sessionStorage.getItem(Ssesionkeys.rol),
    }
    return ssesion;
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(Ssesionkeys.token);
  }
  public getUsername(): string | null {
    return window.sessionStorage.getItem(Ssesionkeys.username);
  }
  public getRol(): string | null {
    return window.sessionStorage.getItem(Ssesionkeys.rol);
  }

  public setToken(token: string): void {
    window.sessionStorage.setItem(Ssesionkeys.token, token);
  }
  public setUsername(username: string): void {
    window.sessionStorage.setItem(Ssesionkeys.username, username);
  }
  public setRol(rol: string): void {
    window.sessionStorage.setItem(Ssesionkeys.rol, rol);
  }

}
