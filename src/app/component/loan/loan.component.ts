import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Estado } from 'src/app/models/enum/estado/estado.model';
import { PrestacionService } from 'src/app/services/prestacion/prestacion.service';
import { PrestarService } from 'src/app/services/prestar/prestar.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css'],
})
export class LoanComponent implements OnInit {
  usuarioLogged: any;

  fechaInicioPrestamo: any;
  fechaFinPrestamo: any;

  prestar: any = {
    fecha_inicio: '',
    fecha_fin: '',
    duracion_reserva: '',
    estado: 'pendiente',
  };

  usuario = {
    id: '',
    username: '',
    email: '',
    password: '',
    role: '',
    edad: '',
    url_img: '',
    activo: '1',
    enabled: 'true',
  };

  libro_prestacion_id = {
    id: '',
    autor: '',
    titulo: '',
    isbn: '',
    edad: '',
    categoria: '',
    cantidad_veces_reservado: '',
    url_img: '',
    descripcion: '',
    disponible: '',
    editorial: {
      id: '',
      nombre: '',
    },
  };
  prestar_id = {
    id: 1,
    fecha_inicio: '',
    fecha_fin: '',
    estado: 'pendiente',
    duracion_reserva: '',
  };

  prestacion: any = {
    usuario: this.usuario,
    libro_prestacion_id: this.libro_prestacion_id,
    prestar_id: this.prestar_id,
  };

  libro: any;
  resultPrestar: any;
  idResultPrestar: any;
  durationInSeconds: number = 5;
  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicePrestar: PrestarService,
    private serviceUsuario: UsuarioService,
    private servicePrestacion: PrestacionService
  ) {
    this.libro = data;
  }

  ngOnInit(): void {
    this.getUserLogged(`${sessionStorage.getItem('auth-username')}`);
  }

  getUserLogged(data: any) {
    this.serviceUsuario.getByUsername(data).subscribe({
      next: (result: any) => {
        console.log(result);
        this.usuarioLogged = result;
        // this.getBooksByUsername(this.usuarioLogged);
      },
      error: (error: any) => {
        console.log(error + 'getUserLogged');
      },
    });
  }

  postPrestar() {
    this.rellenarPrestacion();
    //this.prestar.fecha_solicitud = this.getNowDate();
    if (this.getValoresPrestar()) {

      this.servicePrestar.add(this.prestar).subscribe({
        next: (result: any) => {
          this.resultPrestar = result;
          this.rellenarPrestacion();
          this.postPrestacion();
        },
        error: (error: any) => {
          console.log(error + ' postPrestar');
        },
      });
    }
  }
  postPrestacion(){
    console.log('postPrestacion');
    console.log(this.prestacion);

     this.servicePrestacion.add(this.prestacion).subscribe({
        next: (result: any) => {


          console.log(result);


        },
        error: (error: any) => {
          console.log(error + ' postPrestar');
        },
      });
    }

  getValoresPrestar(): boolean {
    const msInDay = 24 * 60 * 60 * 1000;
    let inicio = new Date(this.fechaInicioPrestamo);
    let fin = new Date(this.fechaFinPrestamo);
    let diferenciaDias = (fin.getTime() - inicio.getTime()) / msInDay;
    let today = new Date();
    //checkea si la fecha de seleccionada es anterior a hoy
    let inicioAntesToday = (inicio.getTime() - today.getTime()) / msInDay;
    let finAntesToday = (fin.getTime() - today.getTime()) / msInDay;
    this.prestar.fecha_inicio = this.fechaInicioPrestamo;
    this.prestar.fecha_fin = this.fechaFinPrestamo;
    this.prestar.estado = 'pendiente';
    this.prestar.duracion_reserva = diferenciaDias;

    if (
      this.prestar.duracion_reserva < 0 ||
      isNaN(this.prestar.duracion_reserva) ||
      inicioAntesToday < 0 ||
      finAntesToday < 0
    ) {
      this.opensSnackBar('La fecha no es correcta', '');
      return false;
    } else {
      return true;
    }

    //this.prestar.duracion_reserva =
  }

  rellenarPrestacion() {
    this.prestacion.libro_prestacion_id = this.libro.data;
    // this.prestacion.libro_prestacion_id.id = this.libro.id;
    // this.prestacion.libro_prestacion_id.autor = this.libro.autor;
    // this.prestacion.libro_prestacion_id.titulo = this.libro.titulo;
    // this.prestacion.libro_prestacion_id.isbn = this.libro.isbn;
    // this.prestacion.libro_prestacion_id.edad = this.libro.edad;
    // this.prestacion.libro_prestacion_id.categoria = this.libro.categoria;
    // this.prestacion.libro_prestacion_id.cantidad_veces_reservado = this.libro.cantidad_veces_reservado;
    // this.prestacion.libro_prestacion_id.url_img = this.libro.url_img;
    // this.prestacion.libro_prestacion_id.descripcion = this.libro.descripcion;
    // this.prestacion.libro_prestacion_id.disponible = this.libro.disponible;
    // this.prestacion.libro_prestacion_id.editorial.id = this.libro.editorial.id;
    // this.prestacion.libro_prestacion_id.editorial.nombre = this.libro.editorial.nombre;

    this.prestacion.prestar_id = this.resultPrestar;

    this.prestacion.usuario.id = this.usuarioLogged.id;
    this.prestacion.usuario.username = this.usuarioLogged.username;
    this.prestacion.usuario.password = this.usuarioLogged.password;
    this.prestacion.usuario.email = this.usuarioLogged.email;
    this.prestacion.usuario.role = this.usuarioLogged.role;
    this.prestacion.usuario.edad = this.usuarioLogged.edad;
    this.prestacion.usuario.url_img = this.usuarioLogged.url_img;
    this.prestacion.usuario.activo = this.usuarioLogged.activo;
    this.prestacion.usuario.enabled = this.usuarioLogged.enabled;
  }

  /**TOAST */
  opensSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      panelClass: ['css-snackbar'],
    });
  }
  getNowDate(): string {
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
    returnDate += yyyy + '-';

    if (mm < 10) {
      returnDate += `0${mm}-`;
    } else {
      returnDate += `${mm}-`;
    }
    if (dd < 10) {
      returnDate += `0${dd}`;
    } else {
      returnDate += `${dd}`;
    }
    returnDate += ' ';
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
