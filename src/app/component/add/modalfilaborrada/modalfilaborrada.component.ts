import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
@Component({
  selector: 'app-modalfilaborrada',
  templateUrl: './modalfilaborrada.component.html',
  styleUrls: ['./modalfilaborrada.component.css']
})
export class ModalfilaborradaComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalfilaborradaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    //data: { data, key, position },

    this.dialogRef.close(false);
  }
  onYesClick(): void {
    //al cerrar con guardarCambios, envia los datos de newEntry

    this.dialogRef.close(true);
  }
}
