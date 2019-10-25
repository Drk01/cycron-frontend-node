import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as moment from 'moment';

import { AjaxService, url } from '../../services/ajax.service'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-the-brain',
  templateUrl: './the-brain.component.html',
  styleUrls: ['./the-brain.component.styl']
})
export class TheBrainComponent implements OnInit {
  public preloader:boolean = false;
  public signals:any = [];
  public moment:any = moment;
  public base_url:string = url;

  constructor(private request: AjaxService, private auth: AuthService, private router: Router) {
    var ng = this;

    this.auth.authUser((status, message) => {
      if (!status) ng.goTo(['/login']);
    });
  }

  ngOnInit() {
    this.getSignals();
  }

  public goTo(route) {
    this.router.navigate(route);
  }

  
  getSignals() {
    var ng = this;
        ng.preloader = true;

    ng.request.getNotApi('getSignals', false, (response) => {
      ng.signals = response;
      console.log(response);
      ng.preloader = false;
    }, (errors) => {
      console.log(errors);
      ng.preloader = false;
    });
  }
}
