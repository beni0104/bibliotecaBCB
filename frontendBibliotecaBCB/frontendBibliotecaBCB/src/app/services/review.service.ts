import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { UserReview } from '../interfaces/review';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  jwtToken: string = "";

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  attributeJwtToken() {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      const currentUser = storedUser ? JSON.parse(storedUser) : null;
      this.jwtToken = currentUser ? currentUser.accessToken : null;
    }
  }

  async getReviewsByBookId(bookId: number) {
    this.attributeJwtToken();
    try {
      const response = await fetch(`https://bibliotecabcbm.com/api/review/getbybookid?id=${bookId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data: UserReview[] = await response.json();
      return data;
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addReviewToBook(bookId: number, UserReview: UserReview) {
    this.attributeJwtToken();
    try {
      const response = await fetch(`https://bibliotecabcbm.com/api/review/create?bookId=${bookId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.jwtToken}`
        },
        body: JSON.stringify(UserReview)
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
