import { Token } from 'src/app/models/token/token.model';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book/book.model';
import { User } from 'src/app/models/user/user.model';
import { LoginService } from 'src/app/services/auth/login.service';
import { BookService } from 'src/app/services/book/book.service';
import { ValoracionService } from 'src/app/services/valoracion/valoracion.service';
import { Valoracion } from 'src/app/models/valoracion/valoracion.model';
import { Estrellas } from 'src/app/models/enum/estrellas/estrellas.model';

export interface LibroValoracion{
  libro: Book;
  valoracion: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // libro: Book;
  isLoggedIn: boolean = false;
  guess: User;
  // libros!: Book[];
  librosValoraciones: LibroValoracion[] = [];

  constructor(private bookService: BookService,
              private loginService: LoginService,
              private valoracionService: ValoracionService) {
    // this.libroValoracion = {
    //   autor: "",
    //   titulo: "",
    //   url_img: "",
    //   valoracion: 0
    // }
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

  loginGuess(): void{
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

  listBooks(): void{
    this.bookService.list()
        .subscribe(
          {
            next: (libros: Book[]) => {
              this.setValorationBooks(libros);
            },
            error: (resultError: Error) => {
              console.log(`Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`);
            }
          }
    );
  }



  listValorationByLibro(libro: Book, numeroLibro: number): void{
    this.valoracionService.listByBook(libro)
        .subscribe(
          {
            next: (valoraciones: Valoracion[]) => {
              // console.log(valoraciones);
              this.setAverageValoration(libro, valoraciones);
            },
            error: (resultError: Error) => {
              console.log(`Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`);
            }
          }
    );
  }

  setAverageValoration(libro: Book, valoraciones: Valoracion[]): void{
    let avgStars = 0;
    // console.log(Array.isArray(valoraciones) && !valoraciones.length);
    // console.log(!valoraciones.length);
    // console.log(Array.isArray(valoraciones));
    // console.log(numreroLibro + " numreroLibro");
    // const objToRate: {[k : string]: any} = {};
    // objToRate[`rating${numreroLibro}`] = avgStars;
    //this.starForm.setValue(objToRate);
    // console.log(Object.entries(objToRate));
    if (!(Array.isArray(valoraciones) && !valoraciones.length)) {

        valoraciones.forEach(function (valoracion) {
          // console.log(Estrellas[valoracion.valorar.estrellas] + " estrellas");

        avgStars += Number(Estrellas[valoracion.valorar.estrellas]);

      });
      // console.log(avgStars + " avg");
      // // console.log((avgStars /= valoraciones.length) + " avg /= ");
      // console.log(Math.round(avgStars /= valoraciones.length));

      avgStars = Math.round(avgStars /= valoraciones.length);
      // console.log(`${avgStars}`);
      // console.log("valor radio " + this.starForm.get(`rating`)?.value);



      // objToRate[`rating${numreroLibro}`] = avgStars.toString();

      // this.starForm.setValue({ rating1: avgStars.toString() });
      // const objToRate = JSON.parse(`{ rating${numreroLibro}: ${avgStars.toString} }`);
      // console.log(objToRate + " Objeto");
      // console.log(numreroLibro + " numreroLibro");
      ///this.starForm.setValue(objToRate);
    }
    const libroValor = {
      libro: libro,
      valoracion: avgStars
    }
    console.log(Object.values(libroValor));

      this.librosValoraciones.push(libroValor);
      console.log(Object.values(this.librosValoraciones) + " Array");
  }

  setValorationBooks(libros: Book[]): void{

    for (let index = 0; index < libros.length; index++) {
      const libro = libros[index];
      this.listValorationByLibro(libro, index);

    }


  }

}


