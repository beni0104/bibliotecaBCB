import { Component, Input } from '@angular/core';
import { Book } from '../../interfaces/book';
import { Router } from '@angular/router';
import { EncryptionService } from '../../services/encryption.service';

@Component({
  selector: 'app-management-book-card',
  templateUrl: './management-book-card.component.html',
  styleUrl: './management-book-card.component.css'
})
export class ManagementBookCardComponent {
  @Input() book!: Book;

  constructor(private router: Router, private encryptionService: EncryptionService) { }


  goToEdit(book: Book) {
    const encryptedId = this.encryptionService.encrypt(book.id.toString());
    this.router.navigate(['/home/editbook'], { queryParams: { id: encryptedId }});
  }
}
