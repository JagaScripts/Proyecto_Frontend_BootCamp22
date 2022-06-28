import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { RolService } from 'src/app/services/auth/rol.service';
import { SsesionService } from 'src/app/services/auth/ssesion.service';

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
  // @Output() isSigned = new EventEmitter();

  constructor(private router: Router, private route: ActivatedRoute, private ssesionService: SsesionService, private loginService: LoginService, private userService: RolService) {
  
  }

  ngOnInit(): void {
    this.login();
  }

  login():void {

      this.loginService.getUser$().subscribe(user => {
        this.user = user;
      });

      this.userService.getRol$().subscribe(data => {
        this.role = data;
        console.log('navbar ---->' + data);
        this.isLoggedIn = true;
        this.logAvailable = 'Sign Out';
      });

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

}
