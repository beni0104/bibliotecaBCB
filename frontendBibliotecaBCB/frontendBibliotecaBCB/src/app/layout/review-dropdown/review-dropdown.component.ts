import { Component, Input, EventEmitter, Output } from '@angular/core';
import { UserReview } from '../../interfaces/review';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review-dropdown',
  templateUrl: './review-dropdown.component.html',
  styleUrl: './review-dropdown.component.css'
})
export class ReviewDropdownComponent {
  isDropdownOpen = false;
  @Input() bookId!: number;
  @Output() averageRatingChange = new EventEmitter<number>();
  numberOfReviews!: number;
  averageRating: number = 0;
  userReviews: UserReview[] = [];

  // Review form variables for adding a review
  showReviewForm = false;
  reviewRating = 0;
  reviewDescription = '';

  constructor(private reviewService: ReviewService) {
  }

  ngOnInit() {
    this.getReviews();
  }

  async getReviews() {
    try {
      const reviews = await this.reviewService.getReviewsByBookId(this.bookId);
      this.numberOfReviews = reviews.length;
      this.averageRating = +(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1);
      this.userReviews = reviews;
      // Emit the average rating to the parent component
      if(this.numberOfReviews > 0)
        this.averageRatingChange.emit(this.averageRating);
      else
        this.averageRatingChange.emit(0);
    }
    catch (error) {
      console.error(error);
    }
  }

  toggleDropdown() {
    if(this.isDropdownOpen) {
      this.showReviewForm = false;
    }
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  cancelReview() {
    this.showReviewForm = false;
    this.reviewRating = 0;
    this.reviewDescription = '';
  }

  async submitReview() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const UserReview: UserReview = {
      username: currentUser.username,
      rating: this.reviewRating,
      description: this.reviewDescription
    };
    await this.reviewService.addReviewToBook(this.bookId, UserReview);
    this.getReviews();
    this.cancelReview();
  }
}
