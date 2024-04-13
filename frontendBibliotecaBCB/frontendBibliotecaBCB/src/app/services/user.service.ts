import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
import { UsernameAndId } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  async getUsernamesAndIds() {
    try {
      const response = await fetch('http://' + environment.host + ':8080/api/loan/userDetails', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data: UsernameAndId = await response.json();
      return data;
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  }
}
