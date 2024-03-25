import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  @ViewChild('content') contentTemplate!: TemplateRef<any>;
  private modalService = inject(NgbModal);
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  modalTitle: string = '';
  modalMessage: string = '';

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  openVerticallyCentered(content: TemplateRef<any>) {
		this.modalService.open(content);
	}

  signup() {
    if (this.name === '' || this.email === '' || this.password === '' || this.confirmPassword === '') {
      this.modalTitle = "Error";
      this.modalMessage = "All fields are required";
      this.openVerticallyCentered(this.contentTemplate);
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.modalTitle = "Error";
      this.modalMessage = "Passwords do not match";
      this.openVerticallyCentered(this.contentTemplate);
      return;
    }
    this.authenticationService.signup(this.name, this.email, this.password).then(data => {
      console.log(data["message"]);
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

}
