
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {

  starForm = new FormGroup({
    rating: new FormControl()
  });

  botoSubmit() {
    console.log("valor radio " + this.starForm.get('rating')?.value);
  }

  constructor() { }

  ngOnInit(): void {
    console.log("valor radio " + this.starForm.get('rating')?.value);

    this.starForm.setValue({ rating: '4' });
  }

}

