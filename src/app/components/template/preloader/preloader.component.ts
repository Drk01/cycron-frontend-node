import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.styl']
})
export class PreloaderComponent implements OnInit {

  @Input() status: string;

  constructor() { }

  ngOnInit() {

  }

}
