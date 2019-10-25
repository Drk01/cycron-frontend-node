import { Component, OnInit } from '@angular/core';
import { AjaxService } from '../../services/ajax.service'
import { AuthService } from '../../services/auth.service'
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.styl']
})

export class RegisterComponent implements OnInit {

  public preloader:boolean = false;
  public errors:any = {};
  public user:any = {};

  constructor(private request: AjaxService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    
  }

  register(event) {
    event.preventDefault();

    var ng = this;
        ng.preloader = true;

    this.request.post('auth/signup', {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value
    }, (response) => {
      ng.preloader = false;
      ng.errors = {};

      if (response.status == 'ok') {
        
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
          ng.errors = errors;
        });

      }
    }, (errors) => {
      ng.preloader = false;
      if (errors) ng.errors = errors;
    });

  }

  public goTo(route) {
    this.router.navigate(route);
  }

  public getAuthUser (token) {
    var ng = this;
        ng.preloader = true;

    this.request.get('auth/me', token, (response) => {
      ng.user = response;
      ng.auth.save(response);
      ng.preloader = false;
      ng.goTo(['/register/success']);
    }, (errors) => {
      console.log(errors);
    });
  }
}
