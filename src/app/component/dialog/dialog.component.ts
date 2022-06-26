import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Editorial } from 'src/app/models/editorial/editorial.model';
import { EditorialService } from 'src/app/services/editorial/editorial.service';

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
  editoriales: Editorial[]  = [];
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private editorialService: EditorialService
  ) {
  }
  ngOnInit(): void {
    this.getAllEditorial();
  }

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

  getAllEditorial(){
    this.editorialService.list().subscribe({
      next:(result: any) => {
        this.editoriales = result;
      },
      error: (resultError: Error) => {
        console.log(resultError);

      }
    })
  }
}
