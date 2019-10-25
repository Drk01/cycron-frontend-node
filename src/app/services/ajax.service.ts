import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import axios from 'axios';

// var url = 'http://api.community.cycron.swiss';
var url = 'http://127.0.0.1:8181';

@Injectable({
  providedIn: 'root'
})

class AjaxService {

  private url:string = url;

  constructor(private router: Router) {

  }

  private makeUrl (path) : string {
    return this.url + '/api/' + path;
  }

  private makeUrlBase (path) : string {
    return this.url + '/' + path;
  }

  public post (path, data, callback, errorsCallback) {
    var ng = this;
    var options = {};
    var token = "";

    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');
    }

    if (token) {
      options = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      };
    }

    axios.post(this.makeUrl(path), data, options).then(function (response) {
      callback(response.data);
    }).catch(function (error) {
      errorsCallback(error.response.data.error.errors);
      console.log(error);
    });
  }

  public delete (path, callback, errorsCallback) {
    var ng = this;
    var options = {};
    var token = "";

    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');
    }

    if (token) {
      options = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      };
    }

    axios.delete(this.makeUrl(path), options).then(function (response) {
      callback(response.data);
    }).catch(function (error) {
      errorsCallback(error.response.data.error.errors);
      console.log(error);
    });
  }

  public get (path, token = null, callback, errorsCallback) {
    var ng = this;
    var options = {};

    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');
    }

    if (token) {
      options = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      };
    }

    axios.get(this.makeUrl(path), options).then(function (response) {
      callback(response.data);
    }).catch(function (error) {
      errorsCallback(error.response.data.error.errors, error.response.data);
      console.log(error);
    });

  }

  public getNotApi (path, token = null, callback, errorsCallback) {
    var ng = this;
    var options = {};

    axios.get(this.makeUrlBase(path), options).then(function (response) {
      callback(response.data);
    }).catch(function (error) {
      errorsCallback(error.response.data.error.errors, error.response.data);
      console.log(error);
    });

  }

  public goTo(route) {
    this.router.navigate(route);
  }
}

export { url, AjaxService }