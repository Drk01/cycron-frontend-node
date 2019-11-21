import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as moment from 'moment';

import { AjaxService, url } from '../../../services/ajax.service'
import { AuthService } from '../../../services/auth.service'
import {log} from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class CpHomeComponent implements OnInit {
  public preloader:boolean = false;
  public posts:any = [];
  public posts_original:any = [];
  public posts_billboard:any = [];
  public slider_items:any = [];
  public moment:any = moment;
  public currentScroll:number = 6;
  public base_url:string = url;

  constructor(private request: AjaxService, private auth: AuthService, private router: Router) {
    var ng = this;

    this.auth.authUser((status, message) => {
      if (!status) ng.goTo(['/login']);
    });
  }

  ngOnInit() {
    this.getEventsOrConferences();
    this.getPosts();
  }

  getEventsOrConferences() {
    // this.slider_items.push({
    //   type: 'event',
    //   title: 'Exclusive event!!!, a personal appointment with Davide L.',
    //   description: 'Enjoy the event soon in Milan Italy, at the titu theater'
    // });
  }

  PostSlug (str) {
      str = str.replace(/^\s+|\s+$/g, ''); // trim
      str = str.toLowerCase();

      // remove accents, swap ñ for n, etc
      var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
      var to   = "aaaaeeeeiiiioooouuuunc------";
      for (var i=0, l=from.length ; i<l ; i++) {
          str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }

      str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
          .replace(/\s+/g, '-') // collapse whitespace and replace by -
          .replace(/-+/g, '-'); // collapse dashes

      return str;
  }

  getPosts() {
    var ng = this;
        ng.preloader = true;

    ng.request.get('posts/all', false, (response) => {
      ng.posts_billboard = response['posts'].splice(0, 4);

      response['posts'].filter(item => item.important == 1).splice(0, 5).forEach((post) => {
        post.type='post';

        ng.slider_items.push(post);
      });

      let posts = [];
      this.posts_original = [];
      let items = 0;

      response['posts'].forEach((post) => {
        items += 1;

        if (items <= 5) {
          posts.push(post);
        }

        this.posts_original.push(post);
      });


      this.posts = posts;

      ng.preloader = false;
    }, (errors) => {
      console.log(errors);
    });
  }

  public goTo(route) {
    this.router.navigate(route);
  }

  onScroll() {
    let posts_original = this.posts_original;
    this.currentScroll += 6;
    this.posts = posts_original.slice(0, this.currentScroll);
  }
}
