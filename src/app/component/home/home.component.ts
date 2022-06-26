import { Token } from 'src/app/models/token/token.model';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book/book.model';
import { Rol } from 'src/app/models/enum/rol/rol.model';
import { User } from 'src/app/models/user/user.model';
import { LoginService } from 'src/app/services/auth/login.service';
import { BookService } from 'src/app/services/book/book.service';
import { ValoracionService } from 'src/app/services/valoracion/valoracion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // libro: Book;
  isLoggedIn: boolean = false;
  guess: User;
  libros!: Book[];

  constructor(private bookService: BookService,
              private loginService: LoginService,
              private valoracionService: ValoracionService) {
    // this.libro = {
    //   id: 0,
    //   autor: "",
    //   titulo: "",
    //   isbn: "",
    //   edad: 0,
    //   categoria: "",
    //   cantidad_veces_reservado: 0,
    //   url_img: "",
    //   descripcion: "",
    //   disponible: "",
    //   usuario: {
    //     id:1,
    //     username: '',
    //     email: '',
    //     password: '',
    //     role: Rol.GUESS,
    //     edad: new Date(),
    //     url_imagen: '',
    //     activo: '',
    //   }
    // }
    this.guess = {username: 'pepe', password: 'password'};
  }


  ngOnInit(): void {
    // this.bookService.
    this.loginGuess();
  }

  loginGuess(){
    this.loginService.login(this.guess)
    .subscribe(
      {
      next: (token: Token) => {
        window.sessionStorage.setItem('auth-token', token.token);
        this.listBooks();
      },
      error: (resultError: Error) => {
        console.log(`Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`);
      }
    }
    );
  }

  listBooks(){
    this.bookService.list()
        .subscribe(
          {
            next: (libros: Book[]) => {
              this.libros = libros;
            },
            error: (resultError: Error) => {
              console.log(`Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`);
            }
          }
    );
  }

}
