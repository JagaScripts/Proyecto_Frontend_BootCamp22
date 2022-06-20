import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  valorSidebar = 0;

  constructor() {}

  ngOnInit(): void {}

  darValor(value: number ){
    this.valorSidebar = value;
  }
}
