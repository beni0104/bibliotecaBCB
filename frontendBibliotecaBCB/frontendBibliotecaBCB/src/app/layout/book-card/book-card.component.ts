import { Component, Input } from '@angular/core';
import { Book } from '../../interfaces/book';
import { Router } from '@angular/router';
import { EncryptionService } from '../../services/encryption.service';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {
  @Input() book!: Book;
  rating = 4.7;
  constructor(private router: Router, private encryptionService: EncryptionService, private bookService: BookService) { }

  goToDetails(book: Book) {
    const encryptedId = this.encryptionService.encrypt(book.id.toString());
    this.router.navigate(['/home/bookdetails'], { queryParams: { id: encryptedId }, state: { book } });
  }

  toggleFavorite(event: Event, book: Book) {
    event.stopPropagation(); // Prevent opening book details when clicking the favorite button

    if (!this.book.isFavorite) {
      this.bookService.addBookToFavorites(book.id);
      this.book.isFavorite = true;
    }else{
      this.bookService.removeBookFromFavorites(book.id);
      this.book.isFavorite = false;
    }
  }
}
