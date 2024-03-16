import { Component, Inject, PLATFORM_ID  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Book } from '../../interfaces/book';

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrl: './card-grid.component.css'
})
export class CardGridComponent {
  page = 1;
  allBooks: Book[] = [];
  books: Book[] = [];
  collectionSize = 0;
  searchTerm: string = '';

  constructor(private bookservice: BookService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.getBooks();
    this.getAllBooks();
  }

  async getBooks() {
    this.bookservice.getPagedBooks(this.page).then((data: any) => {
      this.collectionSize = data.totalCount;
      this.books = data.books;
    })
    .catch(error => { 
      console.error(error);
    });
    
    if (isPlatformBrowser(this.platformId)) {
      // This code will only execute on the browser
      window.scrollTo(0, 0);
    }
  }

  async getAllBooks() {
    this.bookservice.getAllBooks().then((data: any) => {
      this.allBooks = data;
    })
    .catch(error => { 
      console.error(error);
    });
  }
  

  filterBooks(): void {
    if (!this.searchTerm) {
      this.getBooks();
    } else {
      this.books = this.allBooks.filter(book =>
        book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchTerm.toLowerCase())
        // Add other fields you want to search by
      );
    }
  }
}
