import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Book } from '../interfaces/book';
import { BookDTO } from '../interfaces/book';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  jwtToken: string = "";

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  attributeJwtToken() {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      const currentUser = storedUser ? JSON.parse(storedUser) : null;
      this.jwtToken = currentUser ? currentUser.accessToken : null;
    }
  }

  async getPagedBooks(page: number) {
    const offset = (page - 1) * 25;
    try {
      const response = await fetch(`http://localhost:8080/api/book/getpagedbooks?offset=${offset}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data: Book = await response.json();
      const totalCount = response.headers.get('X-Total-Count');
      return {
        books: data,
        totalCount: totalCount
      };
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllBooks() {
    this.attributeJwtToken();
    try {
      const response = await fetch('http://' + environment.host + ':8080/api/book/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.jwtToken
        }
      });
      const data: Book = await response.json();
      return data;
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getFavoriteBooks() {
    this.attributeJwtToken();
    try {
      const response = await fetch('http://' + environment.host + ':8080/api/favorite/getall', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.jwtToken
        }
      });
      const data: Book = await response.json();
      return data;
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getBookById(id: number) {
    try {
      const response = await fetch('http://' + environment.host + ':8080/api/book/getbyid?id=' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data: Book = await response.json();
      return data;
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createBook(book: BookDTO) {
    this.attributeJwtToken();
    try {
      const response = await fetch('http://' + environment.host + ':8080/api/book/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.jwtToken
        },
        body: JSON.stringify(book)
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

  async addBookToFavorites(bookId: number) {
    this.attributeJwtToken();
    try {
      const url = `http://${environment.host}:8080/api/favorite/add?bookId=${bookId}`;
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.jwtToken
        }
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

  async removeBookFromFavorites(bookId: number) {
    this.attributeJwtToken();
    try {
      const url = `http://${environment.host}:8080/api/favorite/delete?bookId=${bookId}`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.jwtToken
        }
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

  async updateBook(book: BookDTO) {
    this.attributeJwtToken();
    try {
      const response = await fetch('http://' + environment.host + ':8080/api/book/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.jwtToken
        },
        body: JSON.stringify(book)
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

  async deleteBooks(bookIds: number[]) {
    this.attributeJwtToken();
    try {
      const response = await fetch('http://' + environment.host + ':8080/api/book/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.jwtToken
        },
        body: JSON.stringify(bookIds)
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
