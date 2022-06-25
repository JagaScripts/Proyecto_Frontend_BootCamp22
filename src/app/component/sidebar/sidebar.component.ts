import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  valorSidebar = '0';

  @Output() cambiarContenidoSidebar = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  darValor(value: string ){
    this.valorSidebar = value;
  }

  sendMessage(value:string) {
    this.darValor(value)
    this.cambiarContenidoSidebar.emit(this.valorSidebar)
  }
}
