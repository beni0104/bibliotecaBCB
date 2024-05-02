import { Component, inject, ViewChild, TemplateRef, PLATFORM_ID, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
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

  constructor(private router: Router, private authenticationService: AuthenticationService, private translate: TranslateService,  @Inject(PLATFORM_ID) private platformId: Object
) {
  if (isPlatformBrowser(this.platformId)) {
    const browserLang = translate.getBrowserLang();
    const userLang = localStorage.getItem('userLang') ?? browserLang;
    translate.use(userLang || '');
  }
}

  login() {
    this.authenticationService.login(this.email, this.password).then(data => {
      if (data){
        this.router.navigate(['/home']);
      }else{
        this.modalTitle = 'error';
        this.modalMessage = 'invalid-email/password';
        this.modalService.open(this.contentTemplate);
      }
    });
  }

  signup() {
    this.router.navigate(['/signup']);
  }

}
