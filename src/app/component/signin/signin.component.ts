import { Component, OnInit } from '@angular/core';
import { Token } from 'src/app/models/token/token.model';
import { User } from 'src/app/models/user/user.model';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { LoginService } from 'src/app/services/auth/login.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  token!: Token;

  user!: User;

  sigInFail = false;

  submitted: boolean = false;

  constructor(private loginService: LoginService, private usuarioService:UsuarioService) {
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
          console.log(`getItem ${window.sessionStorage.getItem("auth-token")}`);
          window.sessionStorage.setItem("auth-username", this.user.username);

          this.getRolFromUsuario(`${window.sessionStorage.getItem("auth-username")}`);
          this.sigInFail = false;

        },
        error: (resultError: Error) => {
         this.sigInFail = true;
          console.log(`Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`);
        }
      }
    )

  }

  getRolFromUsuario(username: string){
    this.usuarioService.getByUsername(username).subscribe({
      next:(result: Usuario) =>{
        window.sessionStorage.setItem("auth-rol", result.role);
        console.log('rol: '+sessionStorage.getItem("auth-rol"));
      },
      error:(error: any) =>{
        console.log(error+' Error rol sesion user' );

      }
    });
  }

}
