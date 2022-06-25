import { Book } from 'src/app/models/book/book.model';
import { Rol } from 'src/app/models/enum/rol/rol.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { EditorialService } from 'src/app/services/editorial/editorial.service';

@Component({
  selector: 'app-dialogbook',
  templateUrl: './dialogbook.component.html',
  styleUrls: ['./dialogbook.component.css'],
})
export class DialogbookComponent implements OnInit {
  newEntry: Book = {
    id: 0,
    cantidad_veces_reservado: 0,
    url_img: '',
    usuario: {
      id: 0,
      username: '',
      password: '',
      email: '',
      role: Rol.ADMIN,
      edad: new Date(),
      url_imagen: '',
      activo: '1',
    },
    autor: '',
    titulo: '',
    isbn: '',
    edad: 0,
    categoria: '',
    disponible: '',
    descripcion: '',
    editorial: {id:0, nombre:''}
  };

  pushedAutor = 0;
  pushedTitulo = 0;
  pushedIsbn = 0;
  pushedEdad = 0;
  pushedCategoria = 0;
  pushedDisponible = 0;
  pushedDescripcion = 0;
  pushedEditorial = 0;

  editoriales: any = [];
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogbookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private editorialService: EditorialService
  ) {}
  libros: any = [];
  ngOnInit(): void {
    this.editorialService.list().subscribe({
      next:(result: any) => {
        this.editoriales = result;
      },error:(resultError: Error) => {
        console.log(
          `Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`
        );
      }
    });
  }


  onNoClick(): void {
    //data: { data, key, position },

    this.dialogRef.close(null);
  }
  onYesClick(): void {
    //al cerrar con guardarCambios, envia los datos de newEntry

    this.dialogRef.close(this.newEntry);
  }


  controlForm(
    value: string,
    controlEmpty: boolean,
    controlEmail?: boolean,
    controlIsNumber?: boolean
  ) {
    let result = true;
    if (controlEmpty) {
      //no vacio
      let test1 = value.replace(/\s{2,}/g, ' ').trim();
      if (test1 === '') {
        result = false;
      }
    }

    if (controlEmail) {
      //correo electronico
      let regexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (regexp.test(value)) {
        result = false;
      }
    }

    if (controlIsNumber) {
      //que sea numero
      if (this.isNum(value)) {
        result = false;
      }
    }
    console.log(result);

    return result;
  }
  isNum(val: any) {
    return isNaN(val);
  }

  pushed1Time(key: string) {
    switch (key) {
      case 'autor':
        this.pushedAutor++;
        break;
      case 'titulo':
        this.pushedTitulo++;
        break;
      case 'isbn':
        this.pushedIsbn++;
        break;
      case 'edad':
        this.pushedEdad++;
        break;
      case 'categoria':
        this.pushedCategoria++;
        break;
      case 'disponible':
        this.pushedDisponible++;
        break;
      case 'editorial':
        this.pushedEditorial++;
        break;
        case 'descripcion':
          this.pushedDescripcion++;
        break;
      default:
        break;


    }
      console.log(this.pushedAutor);
  }

  addEditorial(){
    this.editorialService.add

  }

}
