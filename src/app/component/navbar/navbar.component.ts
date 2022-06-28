import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Ssesion } from 'src/app/models/ssesion/ssesion.model';
import { LoginService } from 'src/app/services/auth/login.service';
import { RolService } from 'src/app/services/auth/rol.service';
import { SsesionService } from 'src/app/services/auth/ssesion.service';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  logAvailable: string = 'Sign In';
  isLoggedIn!: boolean; //@Input()
  user: any;
  role: any;

  dataBuscar: any;
  libro: any;
  durationInSeconds: number = 5;
  // @Output() isSigned = new EventEmitter();

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private ssesionService: SsesionService,
    private loginService: LoginService,
    private userService: RolService,
    private serviceBook: BookService
  ) {}

  ngOnInit(): void {
    this.login();
  }

  login(): void {
    this.loginService.getUser$().subscribe((user) => {
      this.user = user;
    });

    this.userService.getRol$().subscribe((data) => {
      this.role = data;
      console.log('navbar ---->' + data);
      this.isLoggedIn = true;
      this.logAvailable = 'Sign Out';
    });
  }
  buscar() {
    console.log(this.dataBuscar);
    if (!this.isText(this.dataBuscar)) {
      this.librofindByTitulo(this.dataBuscar);
    } else {
      this.librofindByIsbn(this.dataBuscar);
    }
    //window.sessionStorage.setItem('algo', 'algo');
  }
  /**TOAST */
  opensSnackBar(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      panelClass: ['css-snackbar'],
    });
  }

  librofindByTitulo(titulo: string) {
    this.serviceBook.getByTitulo(titulo).subscribe({
      next: (result: any) => {
        this.libro = result;
        this.routerLink(this.libro.id, this.libro.titulo);
        console.log('libroTitulo');
      },
      error: (error: any) => {
        console.log(error + ' librobytitulo');
        this.opensSnackBar(titulo + ' no encontrado ');
      },
    });
  }
  librofindByIsbn(isbn: string) {
    this.serviceBook.getByIsbn(isbn).subscribe({
      next: (result: any) => {
        console.log('libroIsbn');
        this.libro = result;
        this.routerLink(this.libro.id, this.libro.titulo);
      },
      error: (error: any) => {
        console.log(error + ' librobytitulo');
        this.opensSnackBar(isbn + ' no encontrado ');
      },
    });
  }

  isText(text: string): boolean {
    for (let index = 0; index < text.length; index++) {
      if (isNaN(parseFloat(text))) {
        console.log('es text');
        return false;
      }
      console.log('es numeric');
    }
    return true;
  }
  logout(): void {
    this.ssesionService.signOut();
    this.user = undefined;
    this.role = undefined;
    this.logAvailable = 'Sign In';
    this.isLoggedIn = false;
    // this.isSigned.emit(this.isLoggedIn);
    this.router.navigate(['/signin']);
  }

  routerLink(id: string, titulo: string) {

    this.router.navigate(['/bookdetails/' + titulo + '/' + id]);
  //this.refresh();
  }
  refresh(): void {
    window.location.reload();
}

}
