import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Book } from 'src/app/models/book/book.model';
import { BookService } from 'src/app/services/book/book.service';
import { DialogComponent } from '../dialog/dialog.component';

export interface DialogData {
  animal: string;
  name: string;
  autor: string;
}

var contstLibro = [
  {
    id: 1,
    autor: 'J K Rowling',
    titulo: 'Todas esas cosas que te dire mñn',
    isbn: '0-7645-2641-1',
    edad: 6,
    categoria: 'Terror',
    cantidad_veces_reservado: 0,
    url_img: '../../../assets/img/harry.jpg',
    descripcion: 'simulacion de descripcion larga',
    disponible: '1',
    usuario: {
      id: 1,
      username: 'pepe',
      email: 'pepe@gmail.com',
      password: '$2a$10$XURPShQNCsLjp1ESc2laoObo9QZDhxz73hJPaEv7/cBha4pk0AgP.',
      role: 'GUESS',
      edad: '2022-01-12',
      url_imagen: '/imagnes/usuario',
      activo: '1',
      enabled: true,
      authorities: [
        {
          authority: 'GUESS',
        },
      ],
      accountNonExpired: true,
      accountNonLocked: true,
      credentialsNonExpired: true,
    },
    editorial: {
      id: 31,
      nombre: 'Nordicos',
    },
  },
  {
    id: 11,
    autor: 'Arturo Perez',
    titulo: 'El camino del fuego',
    isbn: '0-7645-2641-2',
    edad: 18,
    categoria: 'Ficcion',
    cantidad_veces_reservado: 0,
    url_img: '../../../assets/img/harry.jpg',
    descripcion:
      'simulacion de descripcion largasimulacion de descripcion largasimulacion de descripcion largasimulacion de descripcion largasimulacion de descripcion largasimulacion de descripcion largasimulacion de descripcion largasimulacion de descripcion largasimulacion de descripcion largasimulacion de descripcion largasimulacion de descripcion largasimulacion de descripcion largasimulacion de descripcion largasimulacion de descripcion largasimulacion de descripcion largasimulacion de descripcion larga',
    disponible: '1',
    usuario: {
      id: 11,
      username: 'marc',
      email: 'marc@gmail.com',
      password: '$2a$10$XURPShQNCsLjp1ESc2laoObo9QZDhxz73hJPaEv7/cBha4pk0AgP.',
      role: 'ADMIN',
      edad: '2022-01-12',
      url_imagen: '/imagnes/usuario',
      activo: '1',
      enabled: true,
      authorities: [
        {
          authority: 'ADMIN',
        },
      ],
      accountNonExpired: true,
      accountNonLocked: true,
      credentialsNonExpired: true,
    },
    editorial: {
      id: 31,
      nombre: 'Nordicos',
    },
  },
];

@Component({
  selector: 'app-tablebooks',
  templateUrl: './tablebooks.component.html',
  styleUrls: ['./tablebooks.component.css'],
})
export class TablebooksComponent implements OnInit {
  libros: any[] = contstLibro;
  testlibro: any = {};
  IsEditing = false;
  idRow?: number;
  bookTemp!: Book;
  constructor(public dialog: MatDialog, private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.list().subscribe({
      next: (result: any) => {
        this.libros = result;
      },
      error: (resultError: Error) => {
        console.log(
          `Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`
        );
      },
    });
    this.bookService.delete('31').subscribe({
      next: (result: any) => {
        this.testlibro = result;
        console.log(Object.values(result));
      },
      error: (resultError: Error) => {
        console.log(
          `Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`
        );
      },
    });
  }

  openDialog(data: any, key: string, position: number): void {
    // pasar el id por el constructor
    if (this.IsEditing) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '550px',
        // data: {name: 'this.name', animal: 'this.animal'}, //valor enviado por dialog

        data: { data, key, position },
      });

      dialogRef.afterClosed().subscribe((result) => {
        // this.animal = result; //valor devuelto por dialog

        this.libros[result.position][`${result.key}`] = result.data;
        console.log('result.data -->' + result.data);

        // let book = new Book(result.data);
        //console.log('autor ' + book.getAutor + ',edad ' + book.getEdad);

        //console.log(result.data+"<-->"+ result.key);

        //id
        // console.log(result.data + '<-result->' + result.id);
        // console.log(this.libros[result.position][`${result.key}`]);
      });
    }
  }

  clearBookTemp() {
    /**limpiar var bookTemp */
  }
  acceptEdit(idRow: number) {
    this.enableEdit();
    this.setIdRow(idRow);
    /*Acciones si se acepta*/
    this.clearBookTemp();

    /*API.PUT*/
  }
  cancelEdit(idRow: number) {
    this.enableEdit();
    this.setIdRow(idRow);
    /*Acciones si se cancela*/
    /*Deshacer los cambios*/
    this.clearBookTemp();
  }
  clickEdit(idRow: number) {
    this.enableEdit();
    this.setIdRow(idRow);
  }
  enableEdit() {
    this.IsEditing = !this.IsEditing;
  }
  setIdRow(idRow: number) {
    this.idRow = idRow;
  }
  removeRow() {
    if (!this.IsEditing) {
      /**Borrar row **/
    }
  }

  controlDescription(text: string, tipo: number) {
    if (text != null) {
      switch (tipo) {
        case 1: // para descripciones
          return text.substring(0, 50) + ' ...';
        case 2: //para titulos
          return text.substring(0, 10) + ' ...';
        default:
          return '';
      }
    } else {
      return '';
    }
  }

  controlDisponibilidad(disponibilidad: string) {
    if (disponibilidad != null) {
      switch (disponibilidad) {
        case '1':
          return 'Disponible';
      }
    } return 'No Disponible';
  }
}
