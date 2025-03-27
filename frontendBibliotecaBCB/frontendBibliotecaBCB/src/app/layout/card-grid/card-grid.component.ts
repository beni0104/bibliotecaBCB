import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../interfaces/book';
import { get } from 'node:http';

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrl: './card-grid.component.css'
})
export class CardGridComponent {
  page = 1;
  allBooks: Book[] = [];
  displayedBooks: Book[] = [];
  filteredBooks: Book[] = [];
  collectionSize = 0;
  searchTerm: string = '';
  filterApplied = false;

  // Fields for the Filter logic
  categories = [
    { name: 'Engleză', selected: false },
    { name: 'Religie', selected: false },
    { name: 'Beletristică', selected: false }
  ];
  isAvailable = false;

  constructor(private translate: TranslateService, private bookservice: BookService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const browserLang = translate.getBrowserLang();
      const userLang = localStorage.getItem('userLang') ?? browserLang;
      translate.use(userLang || '');
    }
  }

  ngOnInit() {
    this.getAllBooks();
  }

  getPagedBooks() {
    if(this.filterApplied) {
      this.displayedBooks = this.filteredBooks.slice((this.page - 1) * 25, this.page * 25);
    }
    else {
      this.displayedBooks = this.allBooks.slice((this.page - 1) * 25, this.page * 25);
    }
    
    if (isPlatformBrowser(this.platformId)) {
      // This code will only execute on the browser
      window.scrollTo(0, 0);
    }
  }

  async getAllBooks() {
    this.bookservice.getAllBooks().then((data: any) => {
      this.allBooks = data;
      for (let i = 0; i < Math.min(25, this.allBooks.length); i++) {
        this.displayedBooks.push(this.allBooks[i]);
      }
      this.collectionSize = this.allBooks.length;
    })
    .catch(error => { 
      console.error(error);
    });
  }

  async searchBooks() {
    if (!this.searchTerm || this.searchTerm === '') {
      this.getAllBooks();
    } else {
      this.bookservice.searchBooks(this.searchTerm).then((data: any) => {
        this.collectionSize = data.length;
        this.filteredBooks = data;
        this.displayedBooks = this.filteredBooks.slice(0, Math.min(25, this.filteredBooks.length));
        this.filterApplied = true;
      });
    }
  }

  applyFilters(): void {
    const selectedCategories = this.categories.filter(category => category.selected).map(category => category.name);
    // TODO filter based on availability
    if (selectedCategories.length > 0 || this.isAvailable) {
      this.filteredBooks = this.allBooks.filter(book => {
        for (let i = 0; i < selectedCategories.length; i++) {
          if (book.category.toLowerCase().includes(selectedCategories[i].toLowerCase())) {
            return true;
          }
        }
        return false;
      });
      this.collectionSize = this.filteredBooks.length;
      this.displayedBooks = this.filteredBooks.slice(0, Math.min(25, this.collectionSize));
      this.filterApplied = true;
    }else{
      this.filterApplied = false;
      this.collectionSize = this.allBooks.length;
      this.getPagedBooks();
    }
  }

  changePage(): void {
    if (this.filterApplied) {
      this.displayedBooks = this.filteredBooks.slice((this.page - 1) * 25, this.page * 25);
    } else {
      this.getPagedBooks();
    }
  }

  clearFilters(): void {
    this.categories.forEach(category => {
      category.selected = false;
    });
    this.isAvailable = false;
    this.filterApplied = false;
    this.collectionSize = this.allBooks.length;
    this.filteredBooks = [];
    this.displayedBooks = this.allBooks.slice((this.page - 1) * 25, this.page * 25);
  }

  sortBooks(criteria: string): void {
    switch(criteria) {
      case 'a-z':
        if (this.filterApplied) {
          this.filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
          this.displayedBooks = this.filteredBooks.slice((this.page - 1) * 25, this.page * 25);
        }else {
        this.allBooks.sort((a, b) => a.title.localeCompare(b.title));
        this.displayedBooks = this.allBooks.slice((this.page - 1) * 25, this.page * 25);
        }
        break;
      case 'z-a':
        if (this.filterApplied) {
          this.filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
          this.displayedBooks = this.filteredBooks.slice((this.page - 1) * 25, this.page * 25);
        } else {
          this.allBooks.sort((a, b) => b.title.localeCompare(a.title));
          this.displayedBooks = this.allBooks.slice((this.page - 1) * 25, this.page * 25);
        }
        break;
      case 'popularity':
        // TODO implement sorting by popularity
        break;
      default:
        // Default sorting or error handling
        break;
    }
  }
  

}
