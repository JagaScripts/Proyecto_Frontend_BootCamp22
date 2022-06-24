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
  bookTemp = new Book();
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
    this.bookService.getById('3').subscribe({
      next: (result: any) => {
        this.testlibro = result;
      },
      error: (resultError: Error) => {
        console.log( `Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`
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

        this.saveBookTemp(result.data, result.key);
        // let book = new Book(result.data);
        //console.log('autor ' + book.getAutor + ',edad ' + book.getEdad);

        //console.log(result.data+"<-->"+ result.key);

        //id
        // console.log(result.data + '<-result->' + result.id);
        // console.log(this.libros[result.position][`${result.key}`]);
      });
    }
  }

  saveBookTemp(data: any, key: string) {
    switch (key) {
      case 'id':
        this.bookTemp.setId(data);
        break;
      case 'autor':
        this.bookTemp.setAutor(data);
        break;
      case 'titulo':
        this.bookTemp.setTitulo(data);
        break;
      case 'isbn':
        this.bookTemp.setIsbn(data);
        break;
      case 'edad':
        this.bookTemp.setEdad(data);
        console.log('despues' + this.bookTemp.getEdad());
        break;
      case 'categoria':
        this.bookTemp.setCategoria(data);
        break;
      case 'cantidad_veces_reservado':
        this.bookTemp.setCantidad_veces_reservado(data);
        break;
      case 'url_img':
        this.bookTemp.setUrl_img(data);
        break;
      case 'descripcion':
        this.bookTemp.setDescripcion(data);
        break;
      case 'disponible':
        this.bookTemp.setDisponible(data);
        break;
      default:
        break;
    }
  }
  clearBookTemp() {
    /**limpiar var bookTemp */
    this.bookTemp.resetAll();
  }
  acceptEdit(idRow: number) {
    this.enableEdit();
    this.setIdRow(idRow);
    /*Acciones si se acepta*/
    this.recorrerLibro();
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
    switch (tipo) {
      case 1: // para descripciones
        return text.substring(0, 50) + ' ...';
      case 2: //para titulos
        return text.substring(0, 10) + ' ...';
      default:
        return;
    }
  }

  controlDisponibilidad(disponibilidad: string) {
    switch (disponibilidad) {
      case '1':
        return 'Disponible';
      case '0':
        return 'No Disponible';
      default:
        return;
    }
  }
  recorrerLibro() {
    console.log(this.bookTemp.getId());
    console.log(this.bookTemp.getAutor());
    console.log(this.bookTemp.getTitulo());
    console.log(this.bookTemp.getIsbn());
    console.log(this.bookTemp.getEdad());
    console.log(this.bookTemp.getCategoria());
  }
}
