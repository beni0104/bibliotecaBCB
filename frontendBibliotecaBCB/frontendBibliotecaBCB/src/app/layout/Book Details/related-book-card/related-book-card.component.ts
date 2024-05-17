import { Component, Input } from '@angular/core';
import { Book } from '../../../interfaces/book';
import { EncryptionService } from '../../../services/encryption.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-related-book-card',
  templateUrl: './related-book-card.component.html',
  styleUrl: './related-book-card.component.css'
})
export class RelatedBookCardComponent {
  @Input() book!: Book;
  isFavorite = true;

  constructor(private router: Router, private encryptionService: EncryptionService) { }

  openBookDetails(book : Book) {
    // Implement navigation to book details page
    console.log('Navigating to book details page: ' + this.book.title);
    const encryptedId = this.encryptionService.encrypt(this.book.id.toString());
    this.router.navigate(['/home/bookdetails'], { queryParams: { id: encryptedId }, state: { book } });
  }

  toggleFavorite(event: Event, book: Book) {
    event.stopPropagation(); // Prevent opening book details when clicking the favorite button
    // Implement favorite toggle logic
    this.isFavorite = !this.isFavorite;
  }

}
