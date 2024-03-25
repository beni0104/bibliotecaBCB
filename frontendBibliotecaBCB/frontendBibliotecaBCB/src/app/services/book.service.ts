import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../interfaces/book';
import { BookDTO } from '../interfaces/book';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

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
    try {
      const response = await fetch('http://' + environment.host + ':8080/api/book/all', {
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
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');
      const jwtToken = currentUser ? currentUser.accessToken : null;
      const response = await fetch('http://' + environment.host + ':8080/api/book/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwtToken
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

}
