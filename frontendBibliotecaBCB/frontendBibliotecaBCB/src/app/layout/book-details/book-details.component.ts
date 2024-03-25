import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Book } from '../../interfaces/book';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EncryptionService } from '../../services/encryption.service';
import { BookService } from '../../services/book.service';
import { truncateSync } from 'fs';

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
  relatedBooks: Book[] = [
    {
      "id": 1546,
      "bookId": 56,
      "title": "PLEDUARIE PENTRU IERTARE",
      "author": "BEBE CIAUȘU ",
      "category": "",
      "amount": 1
  },
  {
      "id": 1547,
      "bookId": 239,
      "title": "POATE OMUL SĂ TRĂIASCĂ FĂRĂ DUMNEZEU?",
      "author": "RAVI ZACHARIAS",
      "category": "APOLOGETICĂ ",
      "amount": 1
  },
  {
      "id": 1548,
      "bookId": 460,
      "title": "POATE ȘTIINȚA EXPLICA TOTUL?",
      "author": "JOHN C. LENNOX",
      "category": "",
      "amount": 1
  },
  {
      "id": 1549,
      "bookId": 197,
      "title": "POEME PENTRU OAMENI SINCERI",
      "author": "FLORIN LUCACI",
      "category": "",
      "amount": 1
  },
  {
      "id": 1550,
      "bookId": 95,
      "title": "POLIȚISTUL CREȘTIN",
      "author": "KIBINGE WA MUTURI",
      "category": "",
      "amount": 1
  },
  {
      "id": 1551,
      "bookId": 19,
      "title": "POLLYANNA",
      "author": "HARRIET LUMMIS SMITH",
      "category": "",
      "amount": 1
  },
  {
      "id": 1552,
      "bookId": 28,
      "title": "PORTRETE DIN CIOBURI vol 1,2",
      "author": "LIGIA SEMAN",
      "category": "BELETRISTICĂ ",
      "amount": 1
  },
  {
      "id": 1553,
      "bookId": 259,
      "title": "PORTRETUL BIBLIC AL CĂSNICIEI",
      "author": "DR. BRUCE H. WILKILSON",
      "category": "CĂSĂTORIE",
      "amount": 1
  },
  {
      "id": 1554,
      "bookId": 852,
      "title": "POVESTEA LUI DUMNEZEU",
      "author": "MAX LUCADO",
      "category": "",
      "amount": 1
  },
  {
      "id": 1555,
      "bookId": 391,
      "title": "POVESTEA LUI TAD",
      "author": "MARY E. ROPES",
      "category": "CARTE COPII",
      "amount": 1
  },
  {
      "id": 1556,
      "bookId": 360,
      "title": "POVESTIȚI PRINTRE NEAMURI SLAVA LUI",
      "author": "RUBEN DUBEI",
      "category": "",
      "amount": 1
  },
  {
      "id": 1557,
      "bookId": 590,
      "title": "PREA OCUPAT PENTRU A MĂ RUGA",
      "author": "BILL HYBELS",
      "category": "",
      "amount": 1
  },
  {
      "id": 1558,
      "bookId": 645,
      "title": "PREDESTINAREA ABSOLUTĂ",
      "author": "ANDREI CROITORU",
      "category": "",
      "amount": 1
  },
  {
      "id": 1559,
      "bookId": 313,
      "title": "PREDICI CU HAR",
      "author": "C. H. SPURGEON",
      "category": "",
      "amount": 1
  }
  ];
  isAvailable: boolean = true;
  averageRating: number = 1.5;


  constructor(
      private bookservice: BookService,
      private encryptionService: EncryptionService,
      private route: ActivatedRoute,
      private router: Router,
      @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // This code will only execute on the browser
      window.scrollTo(0, 0);
    }
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
  }

  rentBook(): void {
    // Logic to handle renting the book
  }

  submitReview(): void {
    // Logic to handle submitting a review
  }
}
