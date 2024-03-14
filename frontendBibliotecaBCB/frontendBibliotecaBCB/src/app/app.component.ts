import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontendBibliotecaBCB';
  isLoggedIn = false;

  constructor() {
  }

  changeLoginStatus() {
    this.isLoggedIn = !this.isLoggedIn;
  }

}
