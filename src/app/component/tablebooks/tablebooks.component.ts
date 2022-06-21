import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-tablebooks',
  templateUrl: './tablebooks.component.html',
  styleUrls: ['./tablebooks.component.css']
})
export class TablebooksComponent implements OnInit {
  animal!: string;
  name!: string;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }
  openDialog(): void { // pasar el id por el constructor

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '550px',
      data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
      console.log(this.animal);

    });
  }
}


