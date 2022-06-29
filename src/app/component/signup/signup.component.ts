
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Rol } from 'src/app/models/enum/rol/rol.model';
import { Token } from 'src/app/models/token/token.model';
import { User } from 'src/app/models/user/user.model';
import { LoginService } from 'src/app/services/auth/login.service';
import { SsesionService } from 'src/app/services/auth/ssesion.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  starForm = new FormGroup({
    star: new FormControl(),
  });

  usuario = {
    id: 0,
    username: '',
    password: '',
    email: '',
    role: Rol.USER,
    edad: new Date(),
    url_imagen: this.starForm.get('star')?.value,
    activo: '1',
  };

  pushedUsername = 0;
  pushedPassword1 = 0;
  pushedPassword2 = 0;
  pushedEmail = 0;
  pushedEdad = 0;

  guess: User;

  fecha_nacimiento: any = null;
  pwd1 = '';
  pwd2 = '';
  durationInSeconds: number = 5;
  constructor(
    private _snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
    private router: Router,
    private ssesionService: SsesionService,
    private loginService: LoginService
  ) {
    this.guess = {username: 'guess', password: 'password'};
  }

  ngOnInit(): void {
    this.starForm.setValue({ star: '../../../assets/img/avatar/avatar5.png' });

    console.log(this.ssesionService.getToken());
    if (this.ssesionService.getToken() != null) {
    } else {
      this.loginGuess();
    }
  }

  loginGuess(): void{
    console.log('atencion guess');
    console.log(this.guess);
    this.loginService.login(this.guess)
    .subscribe(
      {
      next: (token: Token) => {
        window.sessionStorage.setItem('auth-token', token.token);

      },
      error: (resultError: Error) => {
        console.log(`Nombre del error: ${resultError.name}, Mensaje del error: ${resultError.message}, Pila del error: ${resultError.stack}`);
      }
    }
    );
  }

  alpulsarRadioButton() {
    console.log('valor radio: ' + this.starForm.get('star')?.value);
  }

  addUsuario() {
    this.usuarioService.add(this.usuario).subscribe({
      next: (result: any) => {
        this.opensSnackBar('Usuario creado correctamente');
        this.router.navigate(['/signin']);
      },
      error: (error: any) => {
        console.log(error);
        this.opensSnackBar('Error en crear el usuario ');
      },
    });
  }
  /**TOAST */
  opensSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      panelClass: ['css-snackbar'],
    });
  }
  controlPwd(): boolean {
    if (this.pwd1 === this.pwd2) {
      this.usuario.password = this.pwd1;
      return true;
    }
    return false;
  }

  controlForm(value: string, controlEmpty: boolean, controlEmail?: boolean) {
    let result = true;
    if (controlEmpty) {
      //no vacio
      let test1 = value.replace(/\s{2,}/g, ' ').trim();
      if (test1 === '') {
        result = false;
       // console.log(result + 'vacio');
      }
    }

    if (controlEmail) {
      //correo electronico
      let regexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (regexp.test(value)) {
        result = false;
        //console.log(result + ' control email');
      }
    }

    //console.log(result);

    return result;
  }

  controlEmail(value: string): boolean {
    let regexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (regexp.test(value)) {
      //console.log('false');
      return false;
    }
    //console.log('true');
    return true;
  }

  controlFormulario(): boolean {
    if (this.usuario.username == '') {
      return false;
    }
    if (this.fecha_nacimiento == null) {
      return false;
    }
    if (this.controlEmail(this.usuario.email)) {
      return false;
    }
    if (!this.controlPwd()) {
      return false;
    }
    return true;
  }

  botoSubmit() {
    this.usuario.edad = this.fecha_nacimiento;
    this.usuario.password = this.pwd1;
    this.usuario.url_imagen = this.starForm.get('star')?.value;
    console.log(this.usuario);
    //this.alpulsarRadioButton();

    this.addUsuario();
  }

  pushed1Time(key: string) {
    switch (key) {
      case 'username':
        this.pushedUsername++;
        break;
      case 'pwd1':
        this.pushedPassword1++;
        break;
      case 'pwd2':
        this.pushedPassword2++;
        break;
      case 'edad':
        this.pushedEdad++;
        break;
      case 'email':
        this.pushedEmail++;
        break;
      default:
        break;
    }
    //console.log(this.pushedAutor);
  }
}
