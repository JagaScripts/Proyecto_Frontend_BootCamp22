import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css'],
})
export class ValueComponent implements OnInit {
  starForm = new FormGroup({
    rating: new FormControl()
  });

/*
  ---INSTRUCCIONES     'ReactiveFormsModule'----
  importar module     ReactiveFormsModule
  crear un formGroup con sus atributos formcontrols()
  asignarle el nombre al html <form>
  recoger su valor del form
*/

botoSubmit(){
  console.log("valor radio "+ this.starForm.get('rating')?.value);
}

  constructor() {}

  ngOnInit(): void {
    this.starForm.setValue({rating: '4'});
  }
  //recoger valor la valoracion


}
