import { Component, inject, TemplateRef, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
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

  constructor(private router: Router, private authenticationService: AuthenticationService, private translate: TranslateService,  @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const browserLang = translate.getBrowserLang();
      const userLang = localStorage.getItem('userLang') ?? browserLang;
      translate.use(userLang || '');
    }
  }

  openVerticallyCentered(content: TemplateRef<any>) {
		this.modalService.open(content);
	}

  signup() {
    if (this.name === '' || this.email === '' || this.password === '' || this.confirmPassword === '') {
      this.modalTitle = "error";
      this.modalMessage = "all-fields-required";
      this.openVerticallyCentered(this.contentTemplate);
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.modalTitle = "error";
      this.modalMessage = "passwords-dont-match";
      this.openVerticallyCentered(this.contentTemplate);
      return;
    }
    this.authenticationService.signup(this.name, this.email, this.password).then(response => {
      if (response.status == 200) {
        this.authenticationService.login(this.email, this.password).then(data => {
          if (data){
            this.modalTitle = "success";
            this.modalMessage = "signup-successful";
            this.openVerticallyCentered(this.contentTemplate);
            this.router.navigate(['/home']);
          }else{
            this.modalTitle = 'error';
            this.modalMessage = 'invalid-email/password';
            this.openVerticallyCentered(this.contentTemplate);
          }
        });
      }
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

}
