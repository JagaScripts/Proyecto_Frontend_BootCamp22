import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
// @Component({
//   selector: 'app-tablebooks',
//   templateUrl: './tablebooks.component.html',
//   styleUrls: ['./tablebooks.component.css']
// })
export class DialogComponent implements OnInit {
  title: string = '';

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
  ngOnInit(): void {}

  onNoClick(): void {
    //data: { data, key, position },

    this.dialogRef.close(null);
  }
  onYesClick(): void {
    this.dialogRef.close();
  }
  addTitle(){
    this.title = this.data.key;

  }
}
