import { Component, PLATFORM_ID, Inject  } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';


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
      console.log(localStorage.getItem('currentUser'));
    }
  }
  login() {
    this.router.navigate(['/login']);
  }
  signup() {
    this.router.navigate(['/signup']);
  }
}
