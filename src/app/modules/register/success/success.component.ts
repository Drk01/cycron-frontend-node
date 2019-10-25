import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.styl']
})
export class RegisterSuccessComponent implements OnInit {
  public user:any = {};
  
  constructor(private auth: AuthService, private router: Router) {
    var ng = this;

    this.auth.user((user) => {
      ng.user = user;
    });
  }

  ngOnInit() {
  }

  public goTo(route) {
    this.router.navigate(route);
  }
}
