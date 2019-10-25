import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})

export class AppComponent {
  constructor (private auth: AuthService) {

  }

  /* !TODO FIXME Realizar funcion para refrescar el toquen del usuario, cada vez que entre a la pagina */

  ngOnInit() {

  }

}
