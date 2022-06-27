import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HtmlComponent } from './html/html.component';
@Component({
  selector: 'app-toastbook',
  templateUrl: './toastbook.component.html',
  styleUrls: ['./toastbook.component.css']
})
export class ToastbookComponent implements OnInit {
  durationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) {}

  //Ejemplo
  // openSnackBar() {
  //   this._snackBar.openFromComponent(PizzaPartyComponent, {
  //     duration: this.durationInSeconds * 1000,
  //   });
  // }

  ngOnInit(): void {
  }
  // openSnackBar(message: string, action: string) {
  //   this._snackBar.open(message);
  // }
  openSnackBar() {
    this._snackBar.openFromComponent(HtmlComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
