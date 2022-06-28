import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Estado } from 'src/app/models/enum/estado/estado.model';
import { Intercambiar } from 'src/app/models/intercambiar/intercambiar.model';
import { BookService } from 'src/app/services/book/book.service';
import { IntercambiarService } from 'src/app/services/intercambiar/intercambiar.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css'],
})
export class ExchangeComponent implements OnInit {
  librosUserLogged: any = [];
  usuarioLogged: any;
  idRowLibro: any;
  valorSelected = 0;
  durationInSeconds = 5;
  transaccionCorrecta = false;
  date: Date = new Date;

  intercambiar = {
    fecha_solicitud: this.date,
    estado: 'pendiente',
  };
  constructor(
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ExchangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private serviceBook: BookService,
    private serviceUsuario: UsuarioService,
    private serviceIntercambiar: IntercambiarService
  ) {
    console.log(this.getNowDate());
  }

  ngOnInit(): void {
    this.getUserLogged(`${sessionStorage.getItem('auth-username')}`);
  }

  postIntercambiar() {
    this.serviceIntercambiar.add(this.intercambiar).subscribe({
      next: (result: any) => {
        console.log(result);
        this.librosUserLogged = result;
        this.transaccionCorrecta = true;
      },
      error: (error: any) => {
        console.log(error + 'postIntercambiar');
      },
    });
  }

  getBooksByUsername(username: any) {
    this.serviceBook.buscarPropietarioLibro(username).subscribe({
      next: (result: any) => {
        console.log(result);
        this.librosUserLogged = result;
      },
      error: (error: any) => {
        console.log(error + 'getBooksByUsername');
      },
    });
  }

  getUserLogged(data: any) {
    this.serviceUsuario.getByUsername(data).subscribe({
      next: (result: any) => {
        console.log(result);
        this.usuarioLogged = result;
        this.getBooksByUsername(this.usuarioLogged);
      },
      error: (error: any) => {
        console.log(error + 'getUserLogged');
      },
    });
  }
  setIdRow(id: number) {
    this.idRowLibro = id;
  }
  completarTramite() {
    this.date = new Date(this.getNowDate());
    this.postIntercambiar();
    if (this.transaccionCorrecta) {
      this.opensSnackBar('Intercambio solicitado');
      this.dialogRef.close();
      //this.router.navigate(['/sidebarhome']);
    }
  }
  /**TOAST */
  opensSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      panelClass: ['css-snackbar'],
    });
  }

  getNowDate() {
    //return string
    var returnDate = '';
    //get datetime now
    var today = new Date();
    //split
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //because January is 0!
    var yyyy = today.getFullYear();

    var hh = today.getHours();
    var nn = today.getMinutes();
    var ss = today.getSeconds();
    //Interpolation date
    returnDate += yyyy+'-';
    if (dd < 10) {
      returnDate += `0${dd}-`;
    } else {
      returnDate += `${dd}-`;
    }

    if (mm < 10) {
      returnDate += `0${mm}`;
    } else {
      returnDate += `${mm}`;
    }
    returnDate +=' ';
    if (hh < 10) {
      returnDate += `0${hh}`;
    } else {
      returnDate += `${hh}`;
    }
    returnDate += ':';
    if (nn < 10) {
      returnDate += `0${nn}`;
    } else {
      returnDate += `${nn}`;
    }
    returnDate += ':';
    if (ss < 10) {
      returnDate += `0${ss}`;
    } else {
      returnDate += `${ss}`;
    }
    return returnDate;
  }
}
