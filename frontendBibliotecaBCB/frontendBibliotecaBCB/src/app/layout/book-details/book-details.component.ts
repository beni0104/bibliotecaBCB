import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Book } from '../../interfaces/book';
import { Router, ActivatedRoute } from '@angular/router';
import { EncryptionService } from '../../services/encryption.service';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {

  book: Book = {
    "id": 0,
    "bookId": 0,
    "title": "",
    "author": "",
    "category": "",
    "amount": 0
  };
  relatedBooks: Book[] = [];
  isAvailable: boolean = false;
  averageRating: number = 3.87;


  constructor(
      private bookservice: BookService,
      private encryptionService: EncryptionService,
      private route: ActivatedRoute,
      private router: Router,
      @Inject(PLATFORM_ID) private platformId: Object) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {book: Book};
    if (state && state.book) {
      this.book = state.book;
      
    } else {
      this.route.queryParams.subscribe(params => {
        const decryptedId = this.encryptionService.decrypt(params['id']);
        this.bookservice.getBookById(Number(decryptedId)).then((data: any) => {
          this.book = data;
        })
      });
    }
    if (isPlatformBrowser(this.platformId)) {
      // This code will only execute on the browser
      window.scrollTo(0, 0);
    }
  }

  ngOnInit(): void {
    // Initialization code here
    // Fetch the book details, availability status, rating, reviews, and related books
  }

  rentBook(): void {
    // Logic to handle renting the book
  }

  submitReview(): void {
    // Logic to handle submitting a review
  }
}
