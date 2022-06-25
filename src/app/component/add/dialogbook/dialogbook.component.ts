import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Book } from 'src/app/models/book/book.model';

import { Rol } from 'src/app/models/enum/rol/rol.model';
import { DialogComponent } from '../../dialog/dialog.component';


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
    usuario: {id:0, username: '', password: '', email: '' , role: Rol.ADMIN , edad: new Date(), url_imagen: '', activo: '1' },
    autor: '',
    titulo: '',
    isbn: '',
    edad: 0,
    categoria: '',
    disponible: '',
    descripcion: '',
  };

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogbookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    //dialogRef.disableClose = true;
  }
  libros: any = [];
  ngOnInit(): void {}

  onNoClick(): void {
    //data: { data, key, position },

    this.dialogRef.close(null);
  }
  onYesClick(): void {
    //al cerrar con guardarCambios, envia los datos de newEntry

    this.dialogRef.close(this.newEntry);
  }
}
