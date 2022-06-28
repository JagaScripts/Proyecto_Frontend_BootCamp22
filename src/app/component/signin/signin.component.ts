import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ssesion } from 'src/app/models/ssesion/ssesion.model';
import { Token } from 'src/app/models/token/token.model';
import { User } from 'src/app/models/user/user.model';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { LoginService } from 'src/app/services/auth/login.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { SsesionService } from 'src/app/services/auth/ssesion.service';
import { RolService } from 'src/app/services/auth/rol.service';
import { Router } from '@angular/router';
import { Rol } from 'src/app/models/enum/rol/rol.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {


  user!: any;

  role: any;

  usuario!: Usuario;

  ssesion: Ssesion;

  sigInFail = false;

  submitted: boolean = false;

  // @Output() isSigned = new EventEmitter();

  constructor(private loginService: LoginService, private usuarioService:UsuarioService, private ssesionService: SsesionService, private rolService: RolService, private router: Router) {
    this.user = {
      username: '',
      password: ''
    }
    this.ssesion = {
      username: '',
      token: '',
      rol: ''
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
          this.ssesion.token = result.token;
          this.ssesionService.setToken(this.ssesion.token);
          this.ssesion.username = this.user.username;
          this.ssesionService.setUsername(this.ssesion.username)
          this.getUsuario(this.user.username);


        },
        error: (resultError: Error) => {
         this.sigInFail = true;
          console.log(`Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`);
        }
      }
    )

  }

  getUsuario(username: string){
    console.log(username + " gerUsuario");
    this.usuarioService.getByUsername(username).subscribe({
      next:(result: Usuario) =>{
        console.log(result);
        this.usuario = result;
        this.ssesion.rol = this.usuario.role;
        this.ssesionService.setRol(this.ssesion.rol);
        this.sigInFail = false;
        this.submitted = true;
        console.log(this.usuario);
        console.log(" usuario");
        this.loginService.setUser(this.user);
        this.loginService.setUser$();
        console.log(Rol[this.usuario.role]);
        this.rolService.addRol(Rol[this.usuario.role]);
        console.log(Rol[this.usuario.role]);
        this.router.navigate(['/sidebarhome']);
        // this.isSigned.emit(this.submitted);

      },
      error:(error: any) =>{
        console.log(error + ' Error rol sesion user' );
      }
    });

  }

}
