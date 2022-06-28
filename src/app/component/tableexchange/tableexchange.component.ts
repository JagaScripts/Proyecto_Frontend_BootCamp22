import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book/book.model';
import { Intercambio } from 'src/app/models/intercambio/intercambio.model';
import { BookService } from 'src/app/services/book/book.service';
import { IntercambiarService } from 'src/app/services/intercambiar/intercambiar.service';
import { IntercambioService } from 'src/app/services/intercambio/intercambio.service';
import { PrestacionService } from 'src/app/services/prestacion/prestacion.service';
import { PrestarService } from 'src/app/services/prestar/prestar.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-tableexchange',
  templateUrl: './tableexchange.component.html',
  styleUrls: ['./tableexchange.component.css'],
})
export class TableexchangeComponent implements OnInit {
  intercambios: any = [];
  intercambiosDelPropietarioLoggeado: any = [];
  intercambiar: any;
  librosTodos: any = [];
  libro1: any;
  libro2: any;
  usuarioLoggeado: any = '';


  //idUsuario = {id: `${this.usuarioLoggeado.id}`};

  constructor(   private serviceIntercambiar: IntercambiarService,
    private serviceIntercambio: IntercambioService,
    private serviceLibro: BookService,
    private serviceUsuario: UsuarioService
  ) {}

  ngOnInit(): void {
    this.getUserLoggeado(); //get user

    console.log(this.libro2);
  }
  refresh(): void {
    window.location.reload();
  }

  /**CRUD */
  getLibrosUsuarioLoggeado(id: string) {
    this.serviceLibro.buscarPropietarioLibro(id).subscribe({
      next: (result: any) => {
        this.librosTodos = result;
        console.log(this.librosTodos);

        this.getAllIntercambios();
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  getAllIntercambios() {
    //tabla de FK
    this.serviceIntercambio.list().subscribe({
      next: (result: any) => {
        this.intercambios = result;
        console.log(result);
        this.intercambiosUsuarioLoggeado();
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  getIntercambiar(id: string) {
    this.serviceIntercambiar.getById(id).subscribe({
      next: (result: any) => {
        this.intercambiar = result;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  getUserLoggeado() {
    this.serviceUsuario
      .getByUsername(`${window.sessionStorage.getItem('auth-username')}`)
      .subscribe({
        next: (result: any) => {
          console.log('usuario logueadoee: ' + result.username);
          this.usuarioLoggeado = result;
          console.log(this.usuarioLoggeado);
          this.getLibrosUsuarioLoggeado(this.usuarioLoggeado);

        },
        error: (error: Error) => {
          console.log('Error, usuario no encontrado');
        },
      });
  }

  intercambiosUsuarioLoggeado() {
    let intercambios = [];
    if (this.intercambios != null) {
      for (let index = 0; index < this.librosTodos.length; index++) {
        const elementLibro: Book = this.librosTodos[index];
        for (let index = 0; index < this.intercambios.length; index++) {
          const elementIntercambio: Intercambio = this.intercambios[index];
          if (
            elementLibro.id == elementIntercambio.libro_1_id ||
            elementLibro.id == elementIntercambio.libro_2_id
          ) {
            intercambios.push(elementIntercambio);
          }
        }
      }
      this.intercambiosDelPropietarioLoggeado = intercambios;
      console.log(this.intercambiosDelPropietarioLoggeado);

    } else {
      console.log('intercambios es null/vacio');
    }
  }

}
