import { Injectable, PLATFORM_ID, Inject  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    let currentUser = null;
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      currentUser = storedUser ? JSON.parse(storedUser) : null;
    }
    
    this.currentUserSubject = new BehaviorSubject<any>(currentUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  async signup(username: string, email: string, password: string) {
    try {
      const response = await fetch('http://' + environment.host + ':8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, role: ['user'] })
      });
      const data = await response.json();
      return data;
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await fetch('http://' + environment.host + ':8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      });
      const user = await response.json();
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  }

  logout() {
    // remove user from local storage to log user out
    console.log(localStorage.getItem('currentUser'));
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
