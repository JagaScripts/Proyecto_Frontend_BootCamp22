import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book/book.model';
import { BookService } from 'src/app/services/book/book.service';
import { ValoracionService } from 'src/app/services/valoracion/valoracion.service';
import { ValorarService } from 'src/app/services/valorar/valorar.service';
import { ExchangeComponent } from '../exchange/exchange.component';
import { LoanComponent } from '../loan/loan.component';
import { ValueComponent } from '../value/value.component';
@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css'],
})
export class BookdetailsComponent implements OnInit {
  libro: any = {};
  allValoracion: any = [];
  allValorar: any = [];
  // idValoracion = {
  //   id: this.libro.id
  // }
  starForm = new FormGroup({
    rating: new FormControl(),
  });
  libroSimulado = {
    id: 11,
    autor: 'Arturo Perez',
    titulo: 'El camino del fuego',
    isbn: '0-7645-2641-2',
    edad: 18,
    categoria: 'Ficcion',
    cantidad_veces_reservado: 0,
    url_img: 'https://covers.openlibrary.org/b/id/240727-L.jpg',
    descripcion: 'paseo por el mar',
    disponible: '1',
    usuario: {
      id: 11,
      username: 'marc',
      email: 'marc@gmail.com',
      password: '$2a$10$XURPShQNCsLjp1ESc2laoObo9QZDhxz73hJPaEv7/cBha4pk0AgP.',
      role: 'ADMIN',
      edad: '2022-01-12',
      url_imagen: '',
      activo: '1',
    },
    editorial: {
      id: 31,
      nombre: 'Nordicos',
    },
  };
  id!: string;
  botoSubmit() {
    console.log('valor radio ' + this.starForm.get('rating')?.value);
  }

  constructor(
    private serviceBook: BookService,
    private serviceValoracion: ValoracionService,
    private serviceValorar: ValorarService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    route.params.subscribe(val => {
      // console.log('valor radio ' + this.starForm.get('rating')?.value);
      this.starForm.setValue({ rating: '4' });
      // console.log('route');
      // let valoracion = this.route.snapshot.data;
      // console.log(valoracion);
      // console.log(this.route.snapshot.paramMap.get('id'));

      this.getLibroById(`${this.route.snapshot.paramMap.get('id')}`);
      // put the code from `ngOnInit` here
    });
  }


  ngOnInit(): void {

    this.starForm.setValue({ rating: '4' });
    let valoracion = this.route.snapshot.data;
    console.log(valoracion);
    console.log(this.route.snapshot.paramMap.get('id'));
    this.getLibroById(`${this.route.snapshot.paramMap.get('id')}`);

  }

  getLibroById(id: string) {
    console.log('libroid');
    this.serviceBook.getById(id).subscribe({
      next: (result: Book) => {
        this.libro = result;
        //this.libro = this.libroSimulado;
        //console.log('valor libro :', this.libro);

        this.getAllValoracion(this.libro.id);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getAllValoracion(data: string) {
    this.serviceValoracion.getByBookId(data).subscribe({
      next: (result: any) => {
        this.allValoracion = result;
       // console.log(this.allValoracion);
      },
      error: (error: any) => {
        console.log(error + ' :valoracion');
      },
    });
  }
  openDialogIntercambiar(data?: any): void {
    console.log('abrir dialog intercambiar');

    const dialogRef = this.dialog.open(ExchangeComponent, {
      width: 'auto',
      height: '75%',
      data: { data },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != null) {

      }
    });
  }
  openDialogValorar(data?: any): void {
    console.log('abrir dialog reservar');

    const dialogRef = this.dialog.open(ValueComponent, {
      width: 'auto',
      height: 'auto',
      data: { data },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != null) {

      }
    });
  }

  openDialogReservar(data?: any, usuarioLogged?: any): void {
    console.log('abrir dialog reservar');

    const dialogRef = this.dialog.open(LoanComponent, {
      width: 'auto',
      height: '80%',
      data: { data, usuarioLogged },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != null) {

      }
    });
  }

  // difBetweenDate(date: Date): string {
  //   //console.log('DATE');
  //   let v = new Date(date);
  //   let text = v.getMonth() + '-' + v.getDay() + '-' + v.getFullYear();
  //   return text;
  // }

  getValueLibroDisponible(dispponible: string): string {
    switch (dispponible) {
      case '0':
        return 'No disponible';
      case '1':
        return 'Disponible';
      default:
        return '';
    }
  }
}
