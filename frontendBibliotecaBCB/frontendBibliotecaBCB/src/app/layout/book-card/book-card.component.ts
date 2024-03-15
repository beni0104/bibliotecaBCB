import { Component, Input } from '@angular/core';
import { Book } from '../../interfaces/book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {
  @Input() book!: Book;
  constructor(private router: Router) { }

  goToDetails(book: Book) {
    this.router.navigate(['/bookdetails'], { state: { book } });
  }
}
