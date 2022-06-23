import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { RolService } from 'src/app/services/auth/rol.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router, private loginService: LoginService, private rolService: RolService) { }

  ngOnInit(): void {
    
  }

}
