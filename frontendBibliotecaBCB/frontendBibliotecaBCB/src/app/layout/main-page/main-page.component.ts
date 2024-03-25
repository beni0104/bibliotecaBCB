import { Component, PLATFORM_ID, Inject  } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {

  isLoggedIn = false;
  user = null;
  isAdmin = false;

  constructor(private router: Router,  @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      this.user = storedUser ? JSON.parse(storedUser) : null;
      this.checkUserRole();
    }
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
      console.log(localStorage.getItem('currentUser'));
    }
  }
  login() {
    this.router.navigate(['/login']);
  }
  signup() {
    this.router.navigate(['/signup']);
  }

  showuser(){
    console.log(this.user);
  }
}
