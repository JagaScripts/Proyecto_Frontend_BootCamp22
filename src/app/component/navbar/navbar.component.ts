import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rol } from 'src/app/models/enum/rol/rol.model';
import { User } from 'src/app/models/user/user.model';
import { LoginService } from 'src/app/services/auth/login.service';
import { RolService } from 'src/app/services/auth/rol.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  logAvailable: string = 'Sign In';
  isLoggedIn: boolean = false;
  usuario:any = null;
  rol: any = null;
  constructor(private router:Router, private loginService: LoginService, private rolService: RolService) { }

  ngOnInit(): void {

    this.loginService.getUser$().subscribe(
      {
        next: (result: User) => {
          this.usuario = result;
          this.isLoggedIn = true;
          this.logAvailable = 'Sign Out';
          this.usuario = sessionStorage.getItem("auth-username");
          this.rol = sessionStorage.getItem("auth-rol");
        },
        error: (resultError: Error) => {
            console.log(`Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`);
        }
      }
    );

    this.rolService.getRol$().subscribe(
      {
        next: (result: Rol) => {
          // this.role = result;
        },
        error: (resultError: Error) => {
            console.log(`Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`);
        }
      }
    );

  }

  logout(): void {
    window.sessionStorage.clear();
    this.usuario = '';
    this.rol = '';
    this.logAvailable = 'Sign In';
    this.isLoggedIn = false;
    this.router.navigate(['/signin']);
  }

}
