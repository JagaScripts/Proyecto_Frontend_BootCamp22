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
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book } from 'src/app/models/book/book.model';
import { Rol } from 'src/app/models/enum/rol/rol.model';
import { Usuario } from 'src/app/models/usuario/usuario.model';
import { BookService } from 'src/app/services/book/book.service';
import { EditorialService } from 'src/app/services/editorial/editorial.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { DialogbookComponent } from '../add/dialogbook/dialogbook.component';
import { ModalfilaborradaComponent } from '../add/modalfilaborrada/modalfilaborrada.component';
import { DialogComponent } from '../dialog/dialog.component';

export interface DialogData {}

@Component({
  selector: 'app-tablebooks',
  templateUrl: './tablebooks.component.html',
  styleUrls: ['./tablebooks.component.css'],
})
export class TablebooksComponent implements OnInit {
  libros: any = []; // = contstLibro;
  librosCopia: any = [];
  IsEditing = false;
  idRow?: number;
  //dialogClosed?: number; //0 cancelado; 1 aceptado
  //libroString: any;
  //aceptModalBorrar: boolean = false;
  durationInSeconds = 5;
  usuarioLogged!: Usuario;
  bookTemp!: Book;

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private bookService: BookService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.buscarUsuarioLogged();
    this.listBooks();
  }

  /**DIALOGS**/

  /** Dialog editar fila*/
  openDialog(data?: any, key?: string, position?: number): void {
    // pasar el id por el constructor

    if (this.IsEditing && position == this.idRow) {
      //editar
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '550px',
        data: { data, key, position },
      });

      if (key == 'editorial') {
        console.log('dentro editorial');
        dialogRef.afterClosed().subscribe((result) => {
          if (result != null) {
            this.libros[result.position][`${result.key}`].nombre = result.data;
            console.log('result.editorial 2-->' + result.data);
          }
        });
      } else {
        console.log('fuera editorial');
        dialogRef.afterClosed().subscribe((result) => {
          if (result != null) {
            this.libros[result.position][`${result.key}`] = result.data;
            console.log('result.data -->' + result.data);
          }
        });
      }
    }
  }
  /**Dialog borrar fila */
  openDialogBorrarRow(id: number): void {
    const dialogRef = this.dialog.open(ModalfilaborradaComponent, {
      width: 'auto',
      height: 'auto',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result + ' <-- resultDialogBorrarROw');
      if (result) {
        this.removeRow(id);
      }
    });
  }

  /**Dialog añadir una fila */
  openDialogNewEntry(data?: any): void {
    //crear

    const dialogRef = this.dialog.open(DialogbookComponent, {
      width: 'auto',
      height: 'auto',
      data: { data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != null) {
        this.addNewBook(result);
        this.listBooks();
        console.log(result);
      }
    });
  }

  /**TOAST */
  opensSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      panelClass: ['css-snackbar'],
    });
  }

  /**ACCIONES PULSAR BOTONES */

  /*Pulsar boton editar*/
  clickEdit(idRow: number) {
    this.enableEdit();
    this.setIdRow(idRow);
    //this.openSnackBar();
  }
  /**Aceptar los cambios */
  acceptEdit(idRow: number, idlibro: number) {
    this.enableEdit();
    this.setIdRow(idRow);
    /*Acciones si se acepta*/
    this.librosCopia[idRow] = JSON.parse(JSON.stringify(this.libros[idRow]));

    this.updateBook(idlibro, this.libros[idRow]);
    /*API.PUT*/
  }
  /**Cancelar los cambios */
  cancelEdit(idRow: number) {
    this.enableEdit();
    this.setIdRow(idRow);
    /*Acciones si se cancela*/
    /*Deshacer los cambios*/
    this.revertChangesOnRow(idRow);
    // this.clearBookTemp();
  }

  /**CRUD  */
  /**PUT BOOKs */
  updateBook(id: number, data: Book) {
    console.log(data);
   // data.usuario = this.userTemp;
    this.bookService.update(id, data).subscribe({
      next: (result: any) => {
        this.opensSnackBar('Libro id ' + data.id + ' editado', '');
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  /**GET ALL BOOKS */
  listBooks() {
    this.bookService.list().subscribe({
      next: (result: any) => {
        // this.libros = result;
        this.historialLibrosUsuario(result);
        this.librosCopia = JSON.parse(JSON.stringify(this.libros));
      },
      error: (resultError: any) => {
        console.log(
          `Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`
        );
      },
    });
  }
  /**AÑADIR LIBRO */
  addNewBook(data: Book) {
    this.bookService.add(data).subscribe({
      next: (result: any) => {
        this.opensSnackBar('Libro ' + data.autor + ' añadido', '');
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  /**BORRAR UN LIBRO */
  removeRow(id: number) {
    if (!this.IsEditing) {
      /**Borrar row **/
      this.bookService.delete(id).subscribe({
        next: (result: any) => {
          console.log('delete ok');
          this.opensSnackBar('Borrado libro ' + id, 'Ok');
        },
        error: (resultError: Error) => {
          console.log('error result');
          this._snackBar.open('Error delete');
          console.log(
            `Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`
          );
        },
      });
    }
  }
  /**BUSCAR LIBROS DE USUARIO LOGEADO */
  historialLibrosUsuario(result: any) {
    let historialLibrosPropietario = [];
  //  console.log(result);

    for (let index = 0; index < result.length; index++) {
      const element: Book = result[index];
     // console.log('ele '+element.usuario.username);
      if (element.usuario != null) {
        if (element.usuario.username == this.usuarioLogged.username) {
          historialLibrosPropietario.push(element);
        }
      }else{
        this._snackBar.open('Warning: Libros sin dueño','Ok');
      }
    }

    if (historialLibrosPropietario != null) {
      this.libros = historialLibrosPropietario;
    }
  }

  /**BuSCAR USUARIO LOGEADo */
  buscarUsuarioLogged() {
    this.usuarioService
      .getByUsername(`${window.sessionStorage.getItem('auth-username')}`)
      .subscribe({
        next: (result: Usuario) => {
          console.log('usuario logueado: ' + result.username);
          this.usuarioLogged = result;
          console.log(this.usuarioLogged);
        },
        error: (error: Error) => {
          console.log('Error, usuario no encontrado');
        },
      });
  }

  /**CONTROL VALORES TABLA */
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
    }
    return 'No Disponible';
  }

  setIdRow(idRow: number) {
    this.idRow = idRow;
  }

  revertChangesOnRow(idRow: number) {
    this.libros[idRow] = JSON.parse(JSON.stringify(this.librosCopia[idRow]));
  }

  printObject(object: Object) {
    console.log(Object.values(object));
  }

  enableEdit() {
    this.IsEditing = !this.IsEditing;
  }

  refresh(): void {
    window.location.reload();
  }
}
