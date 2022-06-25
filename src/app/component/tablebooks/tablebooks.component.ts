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
import { BookService } from 'src/app/services/book/book.service';
import { DialogbookComponent } from '../add/dialogbook/dialogbook.component';
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
  dialogClosed?: number; //0 cancelado; 1 aceptado
  bookTemp!:Book;
  libroString: any;
  durationInSeconds = 5;
  constructor(private _snackBar: MatSnackBar,public dialog: MatDialog, private bookService: BookService) {}


  ngOnInit(): void {
    this.bookService.list().subscribe({
      next: (result: any) => {
        this.libros = result;

        // this.libroString = JSON.stringify(result);
        //this.librosCopia =  JSON.parse(this.libroString);
        this.librosCopia = JSON.parse(JSON.stringify(result));
        //[...this.libros]// Object.assign({}, this.libros);//this.libros.copy();
      },
      error: (resultError: Error) => {
        console.log(
          `Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`
        );
      },
    });
  }

  openDialog(data?: any, key?: string, position?: number): void {
    // pasar el id por el constructor
    if (this.IsEditing && position == this.idRow) {
      //editar
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '550px',
        data: { data, key, position },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result != null) {
          this.libros[result.position][`${result.key}`] = result.data;
          console.log('result.data -->' + result.data);

        }
      });
    }
  }

  opensSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {duration: this.durationInSeconds * 1000,
        panelClass: ['css-snackbar']
      });
    }
  openDialogNewEntry(data?: any): void {
    //crear




    const dialogRef = this.dialog.open(DialogbookComponent, {
      width: 'auto',
      height: 'auto',
      data: { data },
    });

      dialogRef.afterClosed().subscribe((result) => {
        if (result != null) {

          console.log(result);
         // console.log(result.data);
          //console.log(Object.values(result));
          //console.log(Object.values(result.data));
         // console.log(result.data.autor);
         // console.log(result.autor);

      }});

  }

  revertChangesOnRow(idRow: number) {
    // this.libroString = JSON.stringify(this.librosCopia[idRow]);
    // this.libros[idRow] = JSON.parse(this.libroString);

    this.libros[idRow] = JSON.parse(JSON.stringify(this.librosCopia[idRow]));
  }
  printObject(object: Object) {
    console.log(Object.values(object));
  }
  clearBookTemp() {
    /**limpiar var bookTemp */
  }
  acceptEdit(idRow: number) {
    this.enableEdit();
    this.setIdRow(idRow);
    /*Acciones si se acepta*/

    this.librosCopia[idRow] = JSON.parse(JSON.stringify(this.libros[idRow]));
    this.clearBookTemp();

    /*API.PUT*/
  }
  cancelEdit(idRow: number) {
    this.enableEdit();
    this.setIdRow(idRow);
    /*Acciones si se cancela*/
    /*Deshacer los cambios*/
    this.revertChangesOnRow(idRow);
    // this.clearBookTemp();
  }
  clickEdit(idRow: number) {
    this.enableEdit();
    this.setIdRow(idRow);
    //this.openSnackBar();
    this.opensSnackBar('Delete','');
  }
  enableEdit() {
    this.IsEditing = !this.IsEditing;
  }
  setIdRow(idRow: number) {
    this.idRow = idRow;
  }
  removeRow(id:number) {
    if (!this.IsEditing) {
      /**Borrar row **/
      this.bookService.delete(id).subscribe({
        next: (result: any) => {
          console.log('delete ok');
          this._snackBar.open('message');
        },
        error: (resultError: Error) => {
          console.log('error result');
          this._snackBar.open('no msg');
          console.log(
            `Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`
          );
        },
      });
    }
  }

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
    } return 'No Disponible';
  }


}
