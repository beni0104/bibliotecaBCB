import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { Book } from '../../../interfaces/book';
import { Router } from '@angular/router';
import { EncryptionService } from '../../../services/encryption.service';

interface deletePair{
  id: number;
  selected: boolean;
}

@Component({
  selector: 'app-management-book-card',
  templateUrl: './management-book-card.component.html',
  styleUrl: './management-book-card.component.css'
})
export class ManagementBookCardComponent {
  @Input() book!: Book;
  @Output() selectionChange = new EventEmitter<deletePair>();

  constructor(private router: Router, private encryptionService: EncryptionService) { }


  goToEdit(book: Book) {
    const encryptedId = this.encryptionService.encrypt(book.id.toString());
    this.router.navigate(['/home/editbook'], { queryParams: { id: encryptedId }});
  }

  onCheckboxChange(event: any): void {
    // const deletePair: deletePair = { id: this.book.id, selected: event.target.checked};
    this.selectionChange.emit({ id: this.book.id, selected: event.target.checked});
  }
}
