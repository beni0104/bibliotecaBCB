export interface UserReview {
  id: number;
  username: string;
  date: string; // Format: YYYY-MM-DD
  rating: number; // Assume a rating out of 5
  comment: string;
}
