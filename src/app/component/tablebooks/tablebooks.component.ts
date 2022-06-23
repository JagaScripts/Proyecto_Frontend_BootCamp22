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
import { Book } from 'src/app/models/book/book.model';
import { BookService } from 'src/app/services/book/book.service';
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
  bookTemp = new Book();
  libroString: any;
  constructor(public dialog: MatDialog, private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.list().subscribe({
      next: (result: any) => {
        this.libros = result;
       // this.libroString = JSON.stringify(result);
        //this.librosCopia =  JSON.parse(this.libroString);
        this.librosCopia =  JSON.parse(JSON.stringify(result));
        //[...this.libros]// Object.assign({}, this.libros);//this.libros.copy();
      },
      error: (resultError: Error) => {
        console.log(
          `Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`
        );
      },
    });
  }

  openDialog(data: any, key: string, position: number): void {
    // pasar el id por el constructor

    if (this.IsEditing && position == this.idRow) {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '550px',
        data: { data, key, position },
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.libros[result.position][`${result.key}`] = result.data;
        console.log('result.data -->' + result.data);
        this.saveBookTemp(result.data, result.key);
      });
    }
  }

  revertChangesOnRow(idRow: number) {
   // this.libroString = JSON.stringify(this.librosCopia[idRow]);
   // this.libros[idRow] = JSON.parse(this.libroString);

    this.libros[idRow] = JSON.parse(JSON.stringify(this.librosCopia[idRow]));

  }
  printObject(object: Object) {
    console.log(Object.values(object));
  }

  saveBookTemp(data: any, key: string) {
    switch (key) {
      case 'id':
        this.bookTemp.setId(data);
        break;
      case 'autor':
        this.bookTemp.setAutor(data);
        break;
      case 'titulo':
        this.bookTemp.setTitulo(data);
        break;
      case 'isbn':
        this.bookTemp.setIsbn(data);
        break;
      case 'edad':
        this.bookTemp.setEdad(data);
        break;
      case 'categoria':
        this.bookTemp.setCategoria(data);
        break;
      case 'cantidad_veces_reservado':
        this.bookTemp.setCantidad_veces_reservado(data);
        break;
      case 'url_img':
        this.bookTemp.setUrl_img(data);
        break;
      case 'descripcion':
        this.bookTemp.setDescripcion(data);
        break;
      case 'disponible':
        this.bookTemp.setDisponible(data);
        break;
      default:
        break;
    }
  }
  clearBookTemp() {
    /**limpiar var bookTemp */
    this.bookTemp.resetAll();
  }
  acceptEdit(idRow: number) {
    this.enableEdit();
    this.setIdRow(idRow);
    /*Acciones si se acepta*/
    this.librosCopia[idRow] = JSON.parse(JSON.stringify(this.libros[idRow]));
    this.recorrerLibro();
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
  }
  enableEdit() {
    this.IsEditing = !this.IsEditing;
  }
  setIdRow(idRow: number) {
    this.idRow = idRow;
  }
  removeRow() {
    if (!this.IsEditing) {
      /**Borrar row **/
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
    switch (disponibilidad) {
      case '1':
        return 'Disponible';
      case '0':
        return 'No Disponible';
      default:
        return;
    }
  }
  recorrerLibro() {
    console.log(this.bookTemp.getId());
    console.log(this.bookTemp.getAutor());
    console.log(this.bookTemp.getTitulo());
    console.log(this.bookTemp.getIsbn());
    console.log(this.bookTemp.getEdad());
    console.log(this.bookTemp.getCategoria());
  }
}
