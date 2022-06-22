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
  animal!: string;
  name!: any;
  autor!: string;
  libros: any[] = contstLibro;
  IsEditing = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(data: any, key: string, position: number): void {
    // pasar el id por el constructor
    if (this.IsEditing) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '550px',
        // data: {name: 'this.name', animal: 'this.animal'}, //valor enviado por dialog

        data: { data, key, position },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The dialog was closed');
        // this.animal = result; //valor devuelto por dialog

        this.libros[result.position][`${result.key}`] = result.data;

        //id
        // console.log(result.data + '<-result->' + result.id);
        // console.log(this.libros[result.position][`${result.key}`]);
      });
    }
  }

  acceptEdit() {
    this.enableEdit();
    /*Acciones si se acepta*/
    /*API.PUT*/
  }
  cancelEdit() {
    this.enableEdit();
    /*Acciones si se cancela*/
    /*Deshacer los cambios*/
  }
  enableEdit() {
    this.IsEditing = !this.IsEditing;
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
}
