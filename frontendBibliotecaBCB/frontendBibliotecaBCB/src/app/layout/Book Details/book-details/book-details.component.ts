import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { Book } from '../../../interfaces/book';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EncryptionService } from '../../../services/encryption.service';
import { BookService } from '../../../services/book.service';
import { LoanService } from '../../../services/loan.service';
import { LoanRequest } from '../../../interfaces/loan';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {

  book: Book = {
    "id": -1,
    "bookId": 0,
    "title": "",
    "author": "",
    "category": "",
    "photoUrl": "",
    "amount": 0,
    "isFavorite": false,
    "rating": 0
  };
  relatedBooks: Book[] = [];
  isAvailable: boolean = true;
  averageRating: number = 0;

  pickupDate: string = '';
  isDateValid: boolean = false;


  constructor(
      private translate: TranslateService, 
      private loanService: LoanService,
      private bookService: BookService,
      private encryptionService: EncryptionService,
      private route: ActivatedRoute,
      private router: Router,
      @Inject(PLATFORM_ID) private platformId: Object) {
        
        this.route.queryParams.subscribe(params => {
          this.loadBookDetails(params);
        });

      }

  async loadBookDetails(params: Params) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { book: Book };
    if (state && state.book) {
      this.book = state.book;
    } else {
      const decryptedId = this.encryptionService.decrypt(params['id']);
      this.book = await this.bookService.getBookById(Number(decryptedId));
    }
    console.log('Category: ', this.book.category);

    this.bookService.getRelatedBooks(this.book.category).then((data: any) => {
          this.relatedBooks = data;
          console.log('Related books: ', this.relatedBooks);
    });

    if (isPlatformBrowser(this.platformId)) {
      const browserLang = this.translate.getBrowserLang();
      const userLang = localStorage.getItem('userLang') ?? browserLang;
      this.translate.use(userLang || '');
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

  updateAverageRating(newRating: number) {
    this.averageRating = newRating;
  }

  checkDate() {
    if (this.pickupDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Remove time components
      const selectedDate = new Date(this.pickupDate);

      this.isDateValid = selectedDate > today;
    } else {
      this.isDateValid = false;
    }
  }

  confirmRental() {
    if (this.isDateValid) {
      const loanRequest: LoanRequest = {
        pickupDate: new Date(this.pickupDate),
        requestedDate: new Date(),
        bookId: this.book.id
      }
      this.loanService.createLoanRequest(loanRequest).then(() => {
        console.log('Loan request created');
      });
    }
  }
}
