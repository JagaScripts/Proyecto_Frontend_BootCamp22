import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValorarService } from 'src/app/services/valorar/valorar.service';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css'],
})
export class ValueComponent implements OnInit {
  starForm = new FormGroup({
    estrellas: new FormControl(),
  });
  /*
  ---INSTRUCCIONES     'ReactiveFormsModule'----
  importar module     ReactiveFormsModule
  crear un formGroup con sus atributos formcontrols()
  asignarle el nombre al html <form>
  recoger su valor del form
*/

  valorarToSend = {
    id: 0,
    fecha : new Date(),
    estrellas: 5,
    comentario: ''
  }
  durationInSeconds: number = 5;



  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ValueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceValorar: ValorarService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
   //  this.starForm.setValue({rating: '3'});
  }

  /**TOAST */
  opensSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      panelClass: ['css-snackbar'],
    });
  }

  postValorar(){
    this.valorarToSend.fecha = new Date();
    this.valorarToSend.estrellas =  this.starForm.get('estrellas')?.value;
    console.log(this.valorarToSend);

    this.serviceValorar.add(this.valorarToSend).subscribe({
      next: (result: any) => {
        this.opensSnackBar('Valoracion completada');
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  //recoger valor la valoracion
  botoSubmit() {
    console.log('valor radio ' + this.starForm.get('estrellas')?.value);

    this.postValorar();
  }
}
