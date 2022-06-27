import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Book } from 'src/app/models/book/book.model';
import { Valoracion } from 'src/app/models/valoracion/valoracion.model';
import { BookService } from 'src/app/services/book/book.service';
import { ValoracionService } from 'src/app/services/valoracion/valoracion.service';
import { ValorarService } from 'src/app/services/valorar/valorar.service';
@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css'],
})
export class BookdetailsComponent implements OnInit {
  libro: any = {};
  allValoracion: any =[];
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

  botoSubmit() {
    console.log('valor radio ' + this.starForm.get('rating')?.value);
  }

  constructor(private serviceBook: BookService, private serviceValoracion: ValoracionService, private serviceValorar: ValorarService) {}

  ngOnInit(): void {
    console.log('valor radio ' + this.starForm.get('rating')?.value);

    this.starForm.setValue({ rating: '4' });
    this.getLibroById('11');
  }

  getLibroById(id: string) {
    console.log('libroid');

    this.serviceBook.getById(id).subscribe({
      next: (result: Book) => {
        //this.libro = result;
        this.libro = this.libroSimulado;
        console.log('valor libro :', this.libro);

        this.getAllValoracion(this.libro.id);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getAllValoracion(data: string) {
    this.serviceValoracion.getByBookId(data).subscribe({
      next:(result:any) => {
        this.allValoracion = result;
        console.log(this.allValoracion);
      },
      error:(error: any) =>{
        console.log(error+ ' :valoracion');
      }
    })
  }
  getAllValorar(){
    // this.serviceValorar.list().subscribe({
    //   next:(result:any) =>{
    //     this.allValorar = result;
    //     console.log('a');
    //     console.log(this.allValorar);

    //   },
    //   error:(error:any) =>{
    //     console.log(error+ ' :valorar');

    //   }
    // })
  }

  difBetweenDate(date: Date): string {
    console.log('DATE');
    let v = new Date(date);
    let text = v.getMonth()+'-'+v.getDay() +'-'+v.getFullYear();
    return text;

  }

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
