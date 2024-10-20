import { Component, Input } from '@angular/core';
import { Book } from '../../../interfaces/book';
import { EncryptionService } from '../../../services/encryption.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-related-book-card',
  templateUrl: './related-book-card.component.html',
  styleUrl: './related-book-card.component.css'
})
export class RelatedBookCardComponent {
  @Input() book!: Book;

  constructor(private router: Router,
    private encryptionService: EncryptionService,
    private alertService: AlertService,
    private bookService: BookService
  ) { }

  openBookDetails(book : Book) {
    const encryptedId = this.encryptionService.encrypt(this.book.id.toString());
    this.router.navigate(['/home/bookdetails'], { queryParams: { id: encryptedId }, state: { book } });
  }

  toggleFavorite(event: Event, book: Book) {
    event.stopPropagation(); // Prevent opening book details when clicking the favorite button
    if(localStorage.getItem('currentUser') === null){
      this.alertService.showAlert('login-required', "danger", 5000);
      return;
    } else{
      if (!this.book.isFavorite) {
        this.alertService.showAlert('book-added-to-favorites', "success", 5000);
        this.bookService.addBookToFavorites(book.id);
        this.book.isFavorite = true;
      }else{
        this.alertService.showAlert('book-deleted-from-favorites', "success", 5000);
        this.bookService.removeBookFromFavorites(book.id);
        this.book.isFavorite = false;
      }
    }
  }

}
