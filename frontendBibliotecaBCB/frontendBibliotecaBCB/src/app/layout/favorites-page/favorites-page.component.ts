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
    { name: 'CONSILIERE', selected: false },
    { name: 'MĂRTURII', selected: false },
    { name: 'MEDITAȚII', selected: false },
    { name: 'FAMILIE', selected: false },
    { name: 'PARENTING', selected: false },
    { name: 'MEMORII', selected: false },
    { name: 'FEMEI', selected: false },
    { name: 'SEXUALITATE', selected: false },
    { name: 'VINDEVARE', selected: false },
    { name: 'ÎNVĂȚĂTORI', selected: false },
    { name: 'STUDIU BIBLIC', selected: false },
    { name: 'CREȘTERE SPIRITUALĂ', selected: false },
    { name: 'BISERICĂ', selected: false },
    { name: 'HERMENEUTICĂ', selected: false },
    { name: 'PARENTING/RUGĂCIUNE', selected: false },
    { name: 'RUGĂCIUNE', selected: false },
    { name: 'APOLOGETICĂ', selected: false },
    { name: 'BĂRBAȚI', selected: false },
    { name: 'BIOGRAFII', selected: false },
    { name: 'AUTOBIOGRAFIE', selected: false },
    { name: 'DOGMATICĂ', selected: false },
    { name: 'CONDUCERE', selected: false },
    { name: 'EVANGHELIZARE/MISIUNE', selected: false },
    { name: 'CREȘTEREA COPIILOR', selected: false },
    { name: 'POEZIE', selected: false },
    { name: 'ISTORIE', selected: false },
    { name: 'BELETRISTICĂ', selected: false },
    { name: 'CARTE COPII', selected: false },
    { name: 'ENGLEZĂ', selected: false },
    { name: 'CĂSĂTORIE', selected: false },
    { name: 'SCHIȚE DE PREDICI', selected: false },
    { name: 'EDUCAȚIE SEXUALĂ', selected: false },
    { name: 'RELAȚII', selected: false },
    { name: 'BIOGRAFIE', selected: false },
    { name: 'SUFERINȚĂ', selected: false },
    { name: 'ADOLESCENȚI', selected: false }
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

  searchBooks(): void {
    if (!this.searchTerm || this.searchTerm === '') {
      this.displayedBooks = this.allFavorites.slice(0, 25);
      this.collectionSize = this.allFavorites.length;
      this.filterApplied = false;
    } else {
      this.filteredBooks = this.allFavorites.filter(book =>
        book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchTerm.toLowerCase())
        // Add other fields you want to search by
      );
      this.collectionSize = this.filteredBooks.length;
      this.displayedBooks = this.filteredBooks.slice(0, Math.min(25, this.collectionSize));
      this.filterApplied = true;
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
