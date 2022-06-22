import { Component, OnInit } from '@angular/core';
import { Token } from 'src/app/models/token/token.model';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  token!: Token;

  user!: Usuario;

  submitted: boolean = false;

  constructor(private loginService: LoginService) {
    this.user = {
      username: '',
      password: ''
    }
  }

  ngOnInit(): void {
  }

  sigIn(): void {
    console.log("Se ha pulsado el botón");

    this.loginService.login(this.user)
    .subscribe(
      {
        next: (result: Token) => {
          this.token = result;
          this.submitted = true
          window.sessionStorage.setItem("auth-token", this.token.token);
          window.sessionStorage.setItem("auth-username", this.user.username);
        },
        error: (resultError: Error) => {
          console.log(`Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`);
        }
      }
    )
  }

}
