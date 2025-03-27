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
  domain = environment.apiUrl || "bibliotecabcbm.com";

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
      const response = await fetch(`https://${this.domain}/api/book/getpagedbooks?offset=${offset}`, {
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
      const response = await fetch(`https://${this.domain}/api/book/all`, {
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

  async getRelatedBooks(category: string) {
    this.attributeJwtToken();
    try {
      const response = await fetch(`https://${this.domain}/api/book/get-random-by-category?category=` + category, {
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
      const response = await fetch(`https://${this.domain}/api/favorite/getall`, {
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
      const response = await fetch(`https://${this.domain}/api/book/getbyid?id=` + id, {
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

  async searchBooks(searchTerm: string) {
    this.attributeJwtToken();
    try {
      const response = await fetch(`https://${this.domain}/api/book/search?searchTerm=` + searchTerm, {
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

  async createBook(book: BookDTO, file: File | null) {
    this.attributeJwtToken();
    const formData = new FormData();

    // Append the book object as JSON (using Blob for correct MIME type)
    formData.append('book', new Blob([JSON.stringify(book)], { type: 'application/json' }));

    // If a file is selected, append it to the form data
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await fetch(`https://${this.domain}/api/book/create`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + this.jwtToken
        },
        body: formData
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
      const url = `https://${this.domain}/api/favorite/add?bookId=${bookId}`;
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
      const url = `https://${this.domain}/api/favorite/delete?bookId=${bookId}`;

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
      const response = await fetch(`https://${this.domain}/api/book/update`, {
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
      const response = await fetch(`https://${this.domain}/api/book/delete`,{
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
