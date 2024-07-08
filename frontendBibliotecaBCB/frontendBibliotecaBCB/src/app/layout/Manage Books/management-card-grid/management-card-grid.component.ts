import { Component, Inject, PLATFORM_ID, inject, ViewChild, TemplateRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { BookService } from '../../../services/book.service';
import { Book } from '../../../interfaces/book';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface deletePair{
  id: number;
  selected: boolean;
}

@Component({
  selector: 'app-management-card-grid',
  templateUrl: './management-card-grid.component.html',
  styleUrl: './management-card-grid.component.css'
})
export class ManagementCardGridComponent {
  @ViewChild('deleteConfirmationModal') contentTemplate!: TemplateRef<any>;
  private modalService = inject(NgbModal);
  page = 1;
  allBooks: Book[] = [];
  displayedBooks: Book[] = [];
  filteredBooks: Book[] = [];
  collectionSize = 0;
  searchTerm: string = '';
  filterApplied = false;
  selectedBookIds: number[] = [];

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
  

  handleSelectionChange(deletePair: deletePair): void {
    if(deletePair.selected) {
      this.selectedBookIds.push(deletePair.id);
    } else {
      const index = this.selectedBookIds.indexOf(deletePair.id);
      if (index > -1) {
          this.selectedBookIds.splice(index, 1);
      }
    }
  }

  openDeleteConfirmationModal() {
    this.modalService.open(this.contentTemplate, { centered: true });
  }

  deleteSelectedBooks() {
    this.bookservice.deleteBooks(this.selectedBookIds).then(() => {
      this.displayedBooks = this.displayedBooks.filter(book => !this.selectedBookIds.includes(book.id));
      this.selectedBookIds = [];
      console.log(this.displayedBooks)
    })
    .catch(error => {
      console.error(error);
    });
    this.modalService.dismissAll();
  }

}
