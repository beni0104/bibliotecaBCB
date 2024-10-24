import { Injectable, PLATFORM_ID, Inject  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // private currentUserSubject: BehaviorSubject<any>;
  // public currentUser: Observable<any>;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    let currentUser = null;
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      currentUser = storedUser ? JSON.parse(storedUser) : null;
    }
    
    // this.currentUserSubject = new BehaviorSubject<any>(currentUser);
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  // public get currentUserValue() {
  //   return this.currentUserSubject.value;
  // }

  async signup(username: string, email: string, password: string) {
    try {
      const response = await fetch('https://bibliotecabcbm.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, role: ['user'] })
      });
      return response;
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await fetch('https://bibliotecabcbm.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      });

      const data = await response.json();
      let user = JSON.stringify(data);
      localStorage.setItem('currentUser', user);
      // this.currentUserSubject.next(user);
      return true;
    }
    catch (error) {
      return false;
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser && currentUser.roles && currentUser.roles.includes('ROLE_USER')) {
      return true;
    }
    else {
      return false;
    }
  }

  isAdmin(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser && currentUser.roles && currentUser.roles.includes('ROLE_ADMIN')) {
      return true;
    }
    else {
      return false;
    }
  }
}
