import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebarandcontent',
  templateUrl: './sidebarandcontent.component.html',
  styleUrls: ['./sidebarandcontent.component.css'],
})
export class SidebarandcontentComponent implements OnInit {
  valorSidebarSelected: number = 0;
  constructor() {}

  ngOnInit(): void {}

  cambiarContenidoSidebar($event:number) {
    this.valorSidebarSelected = $event
    console.log(this.valorSidebarSelected+ " <-- valorSidebarSelected");

  }


}
