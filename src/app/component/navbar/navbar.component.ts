import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rol } from 'src/app/models/rol/rol.model';
import { User } from 'src/app/models/user/user.model';
import { LoginService } from 'src/app/services/auth/login.service';
import { RolService } from 'src/app/services/auth/rol.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  user!: User;
  // role!: Rol;
  logState!: string;

  constructor(private router:Router, private loginService: LoginService, private rolService: RolService) { }

  ngOnInit(): void {

    this.loginService.getUser$().subscribe(
      {
        next: (result: User) => {
          this.user = result;
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
          this.logState = 'Sign Out';
        },
        error: (resultError: Error) => {
            console.log(`Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`);
        }
      }
    );

  }
  logout(): void {
    window.sessionStorage.clear();
    this.user.username = '';
    // this.role = Rol;
    this.logState = 'Sign In';
    this.router.navigate(['/login']);
  }

}
