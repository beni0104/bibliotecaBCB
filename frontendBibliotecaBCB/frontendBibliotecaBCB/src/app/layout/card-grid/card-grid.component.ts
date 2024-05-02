import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
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
      for (let i = 0; i < 25; i++) {
        this.displayedBooks.push(this.allBooks[i]);
      }
      this.collectionSize = this.allBooks.length;
    })
    .catch(error => { 
      console.error(error);
    });
  }

  searchBooks(): void {
    if (!this.searchTerm || this.searchTerm === '') {
      this.displayedBooks = this.allBooks.slice(0, 25);
      this.collectionSize = this.allBooks.length;
      this.filterApplied = false;
    } else {
      this.filteredBooks = this.allBooks.filter(book =>
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
