import { Component, Input } from '@angular/core';
import { Book } from '../../interfaces/book';
import { Router } from '@angular/router';
import { EncryptionService } from '../../services/encryption.service';
import { BookService } from '../../services/book.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {
  @Input() book!: Book;
  constructor(private router: Router,
              private encryptionService: EncryptionService,
              private bookService: BookService,
              private alertService: AlertService) { }

  goToDetails(book: Book) {
    const encryptedId = this.encryptionService.encrypt(book.id.toString());
    this.router.navigate(['/home/bookdetails'], { queryParams: { id: encryptedId }, state: { book } });
  }

  toggleFavorite(event: Event, book: Book) {
    event.stopPropagation(); // Prevent opening book details when clicking the favorite button

    if (!this.book.isFavorite) {
      this.alertService.showAlert('Cartea a fost adăugată la favorite!', 5000);
      this.bookService.addBookToFavorites(book.id);
      this.book.isFavorite = true;
    }else{
      this.alertService.showAlert('Cartea a fost ștearsă de la favorite!', 5000);
      this.bookService.removeBookFromFavorites(book.id);
      this.book.isFavorite = false;
    }
  }
}
