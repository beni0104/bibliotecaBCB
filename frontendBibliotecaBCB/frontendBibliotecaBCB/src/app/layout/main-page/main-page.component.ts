import { Component, PLATFORM_ID, Inject, inject, TemplateRef, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal  } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  //Modal message setup
  @ViewChild('content') contentTemplate!: TemplateRef<any>;
  private modalService = inject(NgbModal);
  modalTitle = '';
  modalMessage = '';

  isLoggedIn = false;
  user = null;
  isAdmin = false;
  settingsDropdown = false;
  languageDropdown = false;
  themeDropdown = false;

  constructor(private translate: TranslateService, private router: Router,  @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const browserLang = translate.getBrowserLang();
      const userLang = localStorage.getItem('userLang') ?? browserLang;
      translate.use(userLang || '');
      const storedUser = localStorage.getItem('currentUser');
      this.user = storedUser ? JSON.parse(storedUser) : null;
      this.checkUserRole();
      if (this.user) {
        if (!this.isTokenExpired(this.user['accessToken'])) {
          this.isLoggedIn = true;
        } else {
          this.signOut();
        }
      }
    }
  }

  isTokenExpired(token: string): boolean {
    if(!token) return true;
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp !== undefined && decodedToken.exp < currentTime;
  }

  checkUserRole(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser && currentUser.roles && currentUser.roles.includes('ROLE_ADMIN')) {
      this.isAdmin = true;
    }
  }

  signOut() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
      this.user = null;
      this.isAdmin = false;
      this.isLoggedIn = false;
      this.router.navigate(['/home']);

      this.modalTitle = 'success';
      this.modalMessage = 'sign-out-successful';
      this.modalService.open(this.contentTemplate);
    }
  }
  login() {
    this.router.navigate(['/login']);
  }
  signup() {
    this.router.navigate(['/signup']);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('userLang', language); // Save user preference
    this.settingsDropdown = false;
    this.languageDropdown = false;
    this.themeDropdown = false;
  }

  switchSettingsDropdown() {
    this.settingsDropdown = !this.settingsDropdown;
    this.languageDropdown = false;
    this.themeDropdown = false;
  }
}
