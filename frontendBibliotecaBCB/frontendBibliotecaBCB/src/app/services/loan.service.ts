import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
import { UsernameAndId } from '../interfaces/user';
import { Loan } from '../interfaces/loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  jwtToken: string = "";

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  attributeJwtToken() {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      const currentUser = storedUser ? JSON.parse(storedUser) : null;
      this.jwtToken = currentUser ? currentUser.accessToken : null;
    }
  }


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

  async createLoan(loan: Loan) {
    this.attributeJwtToken();
    try {
      const response = await fetch('http://' + environment.host + ':8080/api/loan/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.jwtToken
        },
        body: JSON.stringify(loan)
      });
      if(response.ok) {
        return true;
      }else{
        return false;
      }
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  }
}
