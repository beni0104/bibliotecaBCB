import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  login() {
    this.authenticationService.login(this.email, this.password).then(data => {
      this.router.navigate(['/home']);
    });
  }

  signup() {
    this.router.navigate(['/signup']);
  }

}
