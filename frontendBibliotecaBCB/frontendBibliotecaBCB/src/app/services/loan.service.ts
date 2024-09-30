import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
import { UsernameAndId } from '../interfaces/user';
import { Loan } from '../interfaces/loan';
import { LoanRequest } from '../interfaces/loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  jwtToken: string = "";

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    this.attributeJwtToken();
  }

  attributeJwtToken() {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      const currentUser = storedUser ? JSON.parse(storedUser) : null;
      this.jwtToken = currentUser ? currentUser.accessToken : null;
    }
  }


  async getUsernamesAndIds() {
    try {
      const response = await fetch('https://' + environment.host + ':8080/api/loan/userDetails', {
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

  async getLoans(userId?: number, userName?: string) {
    if(userId) {
      try {
        const response = await fetch('https://' + environment.host + ':8080/api/loan/user?userId=' + userId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data: Loan = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    } else if(userName) {
      try {
        const response = await fetch('https://' + environment.host + ':8080/api/loan/user?userName=' + userName, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data: Loan = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    } else {
      try {
        const response = await fetch('https://' + environment.host + ':8080/api/loan/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data: Loan = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
    
  }

  async createLoan(loan: Loan) {
    this.attributeJwtToken();
    try {
      const response = await fetch('https://' + environment.host + ':8080/api/loan/create', {
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

  async updateLoan(loan: Loan) {
    this.attributeJwtToken();
    try {
      const response = await fetch('https://' + environment.host + ':8080/api/loan/update', {
        method: 'PUT',
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

  //Loan Requests

  async getLoanRequests() {
    try {
      const response = await fetch('https://' + environment.host + ':8080/api/loanRequest/getall', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data: LoanRequest = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getLoanRequestsForUser() {
    this.attributeJwtToken();
    try {
      const response = await fetch('https://' + environment.host + ':8080/api/loanRequest/getforauthuser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.jwtToken
        }
      });
      const data: LoanRequest = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateLoanRequest(loanRequest: LoanRequest, status: string) {
    this.attributeJwtToken();
    loanRequest.status = status;
    try {
      const response = await fetch('https://' + environment.host + ':8080/api/loanRequest/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.jwtToken
        },
        body: JSON.stringify(loanRequest)
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

  async createLoanRequest(loanRequest: LoanRequest) {
    const storedUser = localStorage.getItem('currentUser');
    const currentUser = storedUser ? JSON.parse(storedUser) : null;
    this.jwtToken = currentUser ? currentUser.accessToken : null;
    loanRequest.userId = currentUser.id;
    try {
      const response = await fetch('https://' + environment.host + ':8080/api/loanRequest/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.jwtToken
        },
        body: JSON.stringify(loanRequest)
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
