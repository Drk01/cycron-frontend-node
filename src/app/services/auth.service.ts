import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AjaxService } from './ajax.service';
import { Router } from "@angular/router";

import * as UserStore from "../reducers/actions/user";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public auth_user:any = null;

  constructor(private store: Store<any>, private request: AjaxService, private router: Router) {
    
  }
 
  public user (callback) {
    var ng = this;
        ng.auth_user = this.localStorageGetUser();

    if (ng.auth_user) {
      ng.save(ng.auth_user)

      this.store
        .select('user')
        .subscribe((user) => {
          callback(user[0]);
        });
    } else {
      this.store
        .select('user')
        .subscribe((user) => {
          if (user[0]) {
            callback(user[0]);
          } else {
            callback(undefined);
          }
        });
      
    }
    
  }

  public save (data) {
    localStorage.setItem('user', JSON.stringify(data));
    this.store.dispatch(new UserStore.set(data));
  }

  public save_token (token) {
    localStorage.setItem('token', token);
  }

  public token () {
    let token = localStorage.getItem('token');
    return (token != null && token != undefined && token != '' && token != 'undefined') ? JSON.parse(token) : null;
  }

  public flush () {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.store.dispatch(new UserStore.flush({}));
  }

  public localStorageGetUser () {
    let user = localStorage.getItem('user');
    return (user != null && user != undefined && user != '' && user != 'undefined') ? JSON.parse(user) : null;
  }

  public authUser (callback) {
    var ng = this;

    ng.request.get('auth/me', null, (response) => {
      callback(true, 'success');
    }, (errors, serverError) => {
      if (serverError.error && serverError.error.message && serverError.error.message == 'Token has expired') {
        ng.flush();
        callback(false, serverError.error.message);
      }

      if (serverError.error && serverError.error.message && serverError.error.message == 'Token not provided') {
        callback(false, serverError.error.message);
      }
    });
  }

  public goTo(route) {
    this.router.navigate(route);
  }
}
