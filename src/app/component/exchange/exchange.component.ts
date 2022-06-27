import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from 'src/app/services/book/book.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css'],
})
export class ExchangeComponent implements OnInit {
  librosUserLogged: any = [];
  usuarioLogged: any;
  idRowLibro: any;
  valorSelected: any = 0;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ExchangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private serviceBook: BookService,
    private serviceUsuario: UsuarioService) {

    }

  ngOnInit(): void {
    this.getUserLogged(`${sessionStorage.getItem("auth-username")}`);
  }

  getBooksByUsername(username:any){
    console.log('peto');
    this.serviceBook.buscarPropietarioLibro(username).subscribe({
      next:(result: any) => {

        console.log(result);


        this.librosUserLogged = result;
      },
      error:(error: any)=>{
        console.log(error+ 'getBooksByUsername');

      }
    })
  }

  getUserLogged(data:any){
    this.serviceUsuario.getByUsername(data).subscribe({
      next:(result: any) => {
        console.log(result);
        this.usuarioLogged = result;
        this.getBooksByUsername(this.usuarioLogged);

      },
      error:(error: any)=>{
        console.log(error+ 'getUserLogged');

      }
    })
  }
  setIdRow(id:number){
    this.idRowLibro = id;
  }
}
