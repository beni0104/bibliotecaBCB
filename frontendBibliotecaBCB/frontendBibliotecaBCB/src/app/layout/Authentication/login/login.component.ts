import { Component, inject, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @ViewChild('content') contentTemplate!: TemplateRef<any>;
  private modalService = inject(NgbModal);
  email: string = '';
  password: string = '';
  modalTitle: string = '';
  modalMessage: string = '';

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  login() {
    this.authenticationService.login(this.email, this.password).then(data => {
      if (data){
        this.router.navigate(['/home']);
      }else{
        this.modalTitle = 'Error';
        this.modalMessage = 'Invalid email or password';
        this.modalService.open(this.contentTemplate);
      }
    });
  }

  signup() {
    this.router.navigate(['/signup']);
  }

}
