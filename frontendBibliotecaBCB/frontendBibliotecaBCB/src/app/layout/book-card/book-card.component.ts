import { Component, Input, PLATFORM_ID, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
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
              private alertService: AlertService,
              private translate: TranslateService,
              @Inject(PLATFORM_ID) private platformId: Object) {
                if (isPlatformBrowser(this.platformId)) {
                  const browserLang = translate.getBrowserLang();
                  const userLang = localStorage.getItem('userLang') ?? browserLang;
                  translate.use(userLang || '');
                }
              }

  goToDetails(book: Book) {
    const encryptedId = this.encryptionService.encrypt(book.id.toString());
    this.router.navigate(['/home/bookdetails'], { queryParams: { id: encryptedId }, state: { book } });
  }

  toggleFavorite(event: Event, book: Book) {
    event.stopPropagation(); // Prevent opening book details when clicking the favorite button

    if (!this.book.isFavorite) {
      this.alertService.showAlert('book-added-to-favorites', 5000);
      this.bookService.addBookToFavorites(book.id);
      this.book.isFavorite = true;
    }else{
      this.alertService.showAlert('book-deleted-from-favorites', 5000);
      this.bookService.removeBookFromFavorites(book.id);
      this.book.isFavorite = false;
    }
  }
}
