import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})

export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

  }

  public goTo(route) {
    this.router.navigate(route);
  }
}
