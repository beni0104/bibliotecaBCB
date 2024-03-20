import { Component, Input } from '@angular/core';
import { Book } from '../../interfaces/book';
import { Router } from '@angular/router';
import { EncryptionService } from '../../services/encryption.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {
  @Input() book!: Book;
  rating = 4.7;
  constructor(private router: Router, private encryptionService: EncryptionService) { }

  goToDetails(book: Book) {
    const encryptedId = this.encryptionService.encrypt(book.id.toString());
    this.router.navigate(['/bookdetails'], { queryParams: { id: encryptedId }, state: { book } });
  }
}
