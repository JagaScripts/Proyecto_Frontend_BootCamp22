import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Proyecto_Frontend_BootCamp22';

  // @Input() isLoggedIn!: boolean;
  // @Output() isSigned = new EventEmitter();

  // actualizarLogin(isLoged:boolean){
  //   this.isLoggedIn = !isLoged;
  // }

  // constructor(){
  //   console.log(this.isLoggedIn + " app login");

  // }
}
