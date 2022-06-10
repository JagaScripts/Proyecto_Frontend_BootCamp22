import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tableinfo',
  templateUrl: './tableinfo.component.html',
  styleUrls: ['./tableinfo.component.css']
})
export class TableinfoComponent implements OnInit {


  list: any = [];//proyecto falta parte del token
  listkeys: any = [];

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http.get('https://rickandmortyapi.com/api/character/1,2,3,4,5').subscribe(
      (result) => {
        this.list = result;
        this.listkeys = Object.keys(this.list);
      },
      (error) => {
        console.log('problemas');
      }
    );
  }
}
