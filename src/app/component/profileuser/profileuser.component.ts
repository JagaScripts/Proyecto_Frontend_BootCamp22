import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book/book.model';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { LoginService } from 'src/app/services/auth/login.service';
import { RolService } from 'src/app/services/auth/rol.service';
import { SsesionService } from 'src/app/services/auth/ssesion.service';
import { BookService } from 'src/app/services/book/book.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-profileuser',
  templateUrl: './profileuser.component.html',
  styleUrls: ['./profileuser.component.css']
})
export class ProfileuserComponent implements OnInit {

  user: any;

  usuario!: Usuario;
  libros!: Book[];
  constructor(private serviceLibro: BookService, private loginService: LoginService, private usuarioService:UsuarioService,private rolService: RolService, private ssesionService: SsesionService, private router: Router) { }

  ngOnInit(): void {
    this.loginService.getUser$().subscribe(user => {
      this.user = user;
    });

    this.user = this.loginService.getUser();

    if (this.user != undefined) {
      this.getUsuario(this.user.username);

    } else {
      this.router.navigate(['/signin']);
    }
  }

  getUsuario(username: string){
    console.log(username + " gerUsuario");
    this.usuarioService.getByUsername(username).subscribe({
      next:(result: Usuario) =>{
        this.usuario = result;

        this.getLibros(this.usuario);
      },
      error:(error: any) =>{
        console.log(error + ' Error rol sesion user' );
      }
    });

  }

  getLibros(idUsuario: any){

    this.serviceLibro.buscarPropietarioLibro(idUsuario).subscribe({
      next: (result: any) => {
        this.libros = result;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
