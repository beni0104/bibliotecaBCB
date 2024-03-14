import { Component, Inject, PLATFORM_ID  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BookServiceService } from '../../services/book-service.service';
import { Book } from '../../interfaces/book';

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrl: './card-grid.component.css'
})
export class CardGridComponent {
  page = 1;
  books: Book[] = [];
  collectionSize = 0;

  constructor(private bookservice: BookServiceService, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.getBooks();
  }

  async getBooks() {
    this.bookservice.getPagedBooks(this.page).then((data: any) => {
      this.books = data.books;
      this.collectionSize = data.totalCount;
    })
    .catch(error => { 
      console.error(error);
    });
    
    if (isPlatformBrowser(this.platformId)) {
      // This code will only execute on the browser
      window.scrollTo(0, 0);
    }
  }
}
