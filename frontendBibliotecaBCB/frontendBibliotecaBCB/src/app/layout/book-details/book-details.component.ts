import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Book } from '../../interfaces/book';
import { UserReview } from '../../interfaces/review';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {
  book: Book = {
    "id": 1000,
    "bookId": 367,
    "title": "10 BĂIEȚI CARE AU FĂCUT ISTORIE",
    "author": "IRENE HOWART",
    "category": "CARTE COPII",
    "amount": 1
  };
  relatedBooks: Book[] = [];
  isAvailable: boolean = false;
  userRating: number = 0;
  userReviews: UserReview[] = [
    {
      id: 1,
      username: 'JaneDoe',
      date: '2024-03-12',
      rating: 5,
      comment: 'Fantastic experience! The service was impeccable and the food was out of this world. Highly recommend.'
    },
    {
      id: 2,
      username: 'JohnSmith',
      date: '2024-03-10',
      rating: 4,
      comment: 'Very good place with a cozy atmosphere. The pasta dishes are a must-try!'
    },
    {
      id: 3,
      username: 'TechGeek42',
      date: '2024-03-08',
      rating: 3,
      comment: 'Decent experience overall, but the wait times were longer than expected. The staff was friendly, though.'
    },
    {
      id: 4,
      username: 'NatureLover',
      date: '2024-03-05',
      rating: 5,
      comment: 'An absolutely delightful visit! The outdoor seating offers a great view. Perfect for evenings.'
    },
    {
      id: 5,
      username: 'FoodCritic',
      date: '2024-03-03',
      rating: 2,
      comment: 'I had high expectations, but unfortunately, they were not met. The dishes lacked flavor and the presentation was lacking.'
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {book: Book};
    if (state && state.book) {
      this.book = state.book;
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

  // Add any additional methods you need for functionality
}
