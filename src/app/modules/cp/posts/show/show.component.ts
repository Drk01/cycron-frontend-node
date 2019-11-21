import { Component, OnInit } from '@angular/core';
import { AjaxService, url } from '../../../../services/ajax.service'
import { AuthService } from '../../../../services/auth.service'
import { Router, ActivatedRoute } from "@angular/router";
import * as moment from 'moment'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.styl']
})
export class ShowPostComponent implements OnInit {
  public preloader:boolean = false;
  public post:any = {};
  public user:any = {};
  public moment:any = moment;
  public base_url:string = url;

  constructor(private request: AjaxService, private router: Router, private auth: AuthService, private route: ActivatedRoute, private toastr: ToastrService) {
    var ng = this;

    ng.auth.user((user) => {
      ng.user = user;
      if (!user) {
        sessionStorage.setItem('redirectTo', window.location.href);
      }
    });
  }

  ngOnInit() {
    var ng = this;

    this.getPost();
  }

  getPost() {
    var ng = this;
        ng.preloader = true;
    ng.request.getNotApi('posts/get/'+ng.route.snapshot.paramMap.get("id"), false, (response) => {
      ng.post = response['post'];

      ng.preloader = false;

    }, (errors) => {
      console.log(errors);
    });
  }

  public goTo(route) {
    this.router.navigate(route);
  }
}
