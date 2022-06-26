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
import { Editorial } from 'src/app/models/editorial/editorial.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario/usuario.model';

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
    editorial: { id: 0, nombre: '' },
  };

  pushedAutor = 0;
  pushedTitulo = 0;
  pushedIsbn = 0;
  pushedEdad = 0;
  pushedCategoria = 0;
  pushedDisponible = 0;
  pushedDescripcion = 0;
  pushedEditorial = 0;

  usuarioLoggedo!: Usuario;
  editoriales: any = [];
  addNombreEditorial: string = '';
  libros: any = [];
  durationInSeconds = 5;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogbookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private editorialService: EditorialService,
    private usuarioService: UsuarioService,
    private _snackBar: MatSnackBar
  ) {}


  ngOnInit(): void {
    this.listEditorial();
    this.buscarUsuarioLogged();
  }

  onNoClick(): void {
    //data: { data, key, position },

    this.dialogRef.close(null);
  }
  onYesClick(): void {
    //al cerrar con guardarCambios, envia los datos de newEntry
    this.getEditorialFromForm();
    console.log(this.usuarioLoggedo);

    if(this.usuarioLoggedo != null){
      //this.newEntry.usuario = this.usuarioLoggedo;
      this.dialogRef.close(this.newEntry);
    }

  }
  getEditorialFromForm(){ //busca la editorial seleccionada por el user i la iguala para tener el id
    for (let index = 0; index < this.editoriales.length; index++) {
      const element = this.editoriales[index];
      if(element.nombre === this.newEntry.editorial.nombre){
        this.newEntry.editorial = element;
      }

    }

  }
  controlDefinitivo(): boolean {
    let result = true;
    if (
      !this.controlForm(this.newEntry.autor, true) ||
      !this.controlForm(this.newEntry.titulo, true) ||
      !this.controlForm(this.newEntry.isbn, true) ||
      !this.controlForm(this.newEntry.categoria, true) ||
      !this.controlForm(this.newEntry.disponible, true) ||
      !this.controlForm(this.newEntry.editorial.nombre, true) ||
      !this.controlForm(this.newEntry.descripcion, true)
    ) {
      result = false;
    }

    return result;
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
    //console.log(result);

    return result;
  }
  isNum(val: any) {
    return isNaN(val);
  }

  controlAddEditorial(data: string) {
    let editorial = {
      nombre: data,
    };
    console.log(editorial.nombre + ' <--');

    if (editorial.nombre != '') {
      this.addEditorial(editorial);
      console.log('dentro if');
    }
  }

  addEditorial(data: any) {
    this.editorialService.add(data).subscribe({
      next: (result: any) => {
        console.log(result + 'addEditorial');
        this.opensSnackBar(data.nombre + ' añadido!', 'Ok');
        this.listEditorial();
      },
      error: (resultError: Error) => {
        console.log(resultError);
      },
    });
  }
/**BuSCAR USUARIO LOGEADo */
buscarUsuarioLogged() {
  this.usuarioService
    .getByUsername(`${window.sessionStorage.getItem('auth-username')}`)
    .subscribe({
      next: (result: Usuario) => {
        this.usuarioLoggedo = result;
         this.newEntry.usuario.id = this.usuarioLoggedo.id;
         this.newEntry.usuario.username = this.usuarioLoggedo.username;
         this.newEntry.usuario.password = this.usuarioLoggedo.password;
         this.newEntry.usuario.email = this.usuarioLoggedo.email;
         this.newEntry.usuario.role= this.usuarioLoggedo.role;
         this.newEntry.usuario.edad = this.usuarioLoggedo.edad;
         this.newEntry.usuario.url_imagen = this.usuarioLoggedo.url_imagen;
         this.newEntry.usuario.activo = this.usuarioLoggedo.activo;
      },
      error: (error: Error) => {
        console.log('Error, usuario no encontrado');
      },
    });
}
  /**TOAST */
  opensSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      panelClass: ['css-snackbar'],
    });
  }

  listEditorial() {
    this.editorialService.list().subscribe({
      next: (result: any) => {
        this.editoriales = result;
      },
      error: (resultError: Error) => {
        console.log(
          `Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`
        );
      },
    });
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
    //console.log(this.pushedAutor);
  }
}
