import { Component, OnInit } from '@angular/core';
import { AjaxService } from '../../services/ajax.service'
import { AuthService } from '../../services/auth.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit { 

  public preloader:boolean = false;
  public errors:any = {};
  public user:any = {};

  constructor(private request: AjaxService, private router: Router, private auth: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    
  }

  login(event) {
    event.preventDefault();

    var ng = this;
        ng.preloader = true;

    this.request.post('auth/login', {
      email: event.target.email.value,
      password: event.target.password.value
    }, (response) => {
      ng.preloader = false;
      ng.errors = {};
      if (response.status == 'ok') {
        ng.auth.save_token(response.token);
        ng.getAuthUser(response.token);
      }
    }, (errors) => {
      ng.preloader = false;
      if (errors) ng.errors = errors;
    });

  }

  public getAuthUser (token) {
    var ng = this;
        ng.preloader = true;

    this.request.get('auth/me', token, (response) => {
      ng.user = response;
      ng.auth.save(response);
      ng.preloader = false;
      ng.toastr.success('Welcome back ' + ng.user.name, 'Welcome!', {
        positionClass: 'toast-bottom-right'
      });

      if(sessionStorage.getItem('redirectTo')) {
        window.location.href = sessionStorage.getItem('redirectTo');
        sessionStorage.removeItem('redirectTo');
      } else {
        ng.goTo(['/cp']);
      }

    }, (errors) => {
      console.log(errors);
    });
  }

  public goTo(route) {
    this.router.navigate(route);
  }

}
