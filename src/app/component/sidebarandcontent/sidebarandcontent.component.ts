import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebarandcontent',
  templateUrl: './sidebarandcontent.component.html',
  styleUrls: ['./sidebarandcontent.component.css'],
})
export class SidebarandcontentComponent implements OnInit {
  valorSidebarSelected: any;

  constructor() {

  }

  ngOnInit(): void {
  this.valorSidebarSelected= sessionStorage.getItem('valueSideBarAndContent');
  }

  cambiarContenidoSidebar($event:number) {
    this.valorSidebarSelected = $event;
    console.log(this.valorSidebarSelected+ " <-- valorSidebarSelected");
    sessionStorage.setItem("valueSideBarAndContent",this.valorSidebarSelected);

  }


}
