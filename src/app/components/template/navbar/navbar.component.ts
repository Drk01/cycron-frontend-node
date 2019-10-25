import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.styl']
})

export class NavbarComponent implements OnInit {
  public user:any = {};
  public pathname:any = '#/';

  constructor(private router: Router, private auth: AuthService) { 
    
  }

  ngOnChanges () {
    this.pathname = window.location.pathname;
  }

  ngOnInit() {
    var ng = this;

    ng.auth.user((user) => {
      ng.user = user;
    });

    setInterval(() => {
      ng.pathname = window.location.hash;
    }, 100);

  }

  public goTo(route) {
    this.router.navigate(route);
  }

  public signout() {
    var ng = this;
    ng.auth.flush();
    ng.goTo(['/login']);
  }

}
