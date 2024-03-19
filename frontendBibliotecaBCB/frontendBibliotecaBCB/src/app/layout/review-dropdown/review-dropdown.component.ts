import { Component, Input } from '@angular/core';
import { UserReview } from '../../interfaces/review';

@Component({
  selector: 'app-review-dropdown',
  templateUrl: './review-dropdown.component.html',
  styleUrl: './review-dropdown.component.css'
})
export class ReviewDropdownComponent {
  isDropdownOpen = false;
  @Input() bookId!: number;
  numberOfReviews!: number;
  averageRating!: number;
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
    },
  ];

  constructor() { 
    // Initialization code here
    // Fetch the user reviews for the book
    this.numberOfReviews = 234;
    this.averageRating = 3.5;
  }


  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
