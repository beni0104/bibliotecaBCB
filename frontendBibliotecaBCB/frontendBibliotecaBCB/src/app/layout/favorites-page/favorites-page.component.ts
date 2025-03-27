import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { Book } from '../../interfaces/book';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css'
})
export class FavoritesPageComponent {
  page = 1;
  allFavorites: Book[] = [];
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

  constructor(private translate: TranslateService,
    private bookservice: BookService,
    @Inject(PLATFORM_ID) private platformId: Object) {
      if (isPlatformBrowser(this.platformId)) {
        const browserLang = translate.getBrowserLang();
        const userLang = localStorage.getItem('userLang') ?? browserLang;
        translate.use(userLang || '');
      }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.getFavoriteBooks();
    }
  }

  getPagedBooks() {
    if(this.filterApplied) {
      this.displayedBooks = this.filteredBooks.slice((this.page - 1) * 25, this.page * 25);
    }
    else {
      this.displayedBooks = this.allFavorites.slice((this.page - 1) * 25, this.page * 25);
    }
    
    if (isPlatformBrowser(this.platformId)) {
      // This code will only execute on the browser
      window.scrollTo(0, 0);
    }
  }

  async getFavoriteBooks() {
    this.bookservice.getFavoriteBooks().then((data: any) => {
      this.allFavorites = data;
      for (let i = 0; i < Math.min(25, this.allFavorites.length); i++) {
        this.displayedBooks.push(this.allFavorites[i]);
      }
      this.collectionSize = this.allFavorites.length;
    })
    .catch(error => { 
      console.error(error);
    });
  }

  async searchBooks() {
    if (!this.searchTerm || this.searchTerm === '') {
      this.getFavoriteBooks();
    } else {
      this.bookservice.searchBooks(this.searchTerm).then((data: any) => {
        this.filteredBooks = data.filter((book: any) => book.isFavorite);
        this.collectionSize = this.filteredBooks.length;
        this.displayedBooks = this.filteredBooks.slice(0, Math.min(25, this.filteredBooks.length));
        this.filterApplied = true;
      });
    }
  }

  applyFilters(): void {
    const selectedCategories = this.categories.filter(category => category.selected).map(category => category.name);
    // TODO filter based on availability
    if (selectedCategories.length > 0 || this.isAvailable) {
      this.filteredBooks = this.allFavorites.filter(book => {
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
      this.collectionSize = this.allFavorites.length;
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
    this.collectionSize = this.allFavorites.length;
    this.filteredBooks = [];
    this.displayedBooks = this.allFavorites.slice((this.page - 1) * 25, this.page * 25);
  }

  sortBooks(criteria: string): void {
    switch(criteria) {
      case 'a-z':
        if (this.filterApplied) {
          this.filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
          this.displayedBooks = this.filteredBooks.slice((this.page - 1) * 25, this.page * 25);
        }else {
        this.allFavorites.sort((a, b) => a.title.localeCompare(b.title));
        this.displayedBooks = this.allFavorites.slice((this.page - 1) * 25, this.page * 25);
        }
        break;
      case 'z-a':
        if (this.filterApplied) {
          this.filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
          this.displayedBooks = this.filteredBooks.slice((this.page - 1) * 25, this.page * 25);
        } else {
          this.allFavorites.sort((a, b) => b.title.localeCompare(a.title));
          this.displayedBooks = this.allFavorites.slice((this.page - 1) * 25, this.page * 25);
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
