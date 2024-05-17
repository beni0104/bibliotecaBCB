import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Book } from '../../../interfaces/book';
import { BookService } from '../../../services/book.service';
import { EncryptionService } from '../../../services/encryption.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent {
  editBookForm: FormGroup;
  book: Book = {
    "id": 0,
    "bookId": 0,
    "title": "",
    "author": "",
    "category": "",
    "amount": 0,
    "isFavorite": false,
    "rating": 0
  };

  constructor(private translate: TranslateService,
              private fb: FormBuilder,
              private bookservice: BookService,
              private alertService: AlertService,
              private encryptionService: EncryptionService,
              private route: ActivatedRoute,
              private router: Router,
              @Inject(PLATFORM_ID) private platformId: Object) {
    this.editBookForm = this.fb.group({
      bookId: '',
      title: '',
      author: '',
      category: '',
      amount: '',
      photoUrl: ''
    });
    if (isPlatformBrowser(this.platformId)) {
      const browserLang = translate.getBrowserLang();
      const userLang = localStorage.getItem('userLang') ?? browserLang;
      translate.use(userLang || '');
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // This code will only execute on the browser
      window.scrollTo(0, 0);
    }
    this.route.queryParams.subscribe(params => {
      const decryptedId = this.encryptionService.decrypt(params['id']);
      this.bookservice.getBookById(Number(decryptedId)).then((data: any) => {
        this.book = data;
        this.editBookForm.patchValue({
          bookId: this.book.bookId,
          title: this.book.title,
          author: this.book.author,
          category: this.book.category,
          amount: this.book.amount,
        });
      });
    });
  }

  onSubmit() {
    this.book = {...this.book, ...this.editBookForm.value};
    this.bookservice.updateBook(this.book);
    this.alertService.showAlert('Cartea a fost actualizată cu succes!', "success", 5000);
  }

  validateNumberInput(event: any): void {
    let input = event.target.value;
    
    // Replace non-digit characters. Allows numbers only
    input = input.replace(/\D/g, '');
  
    // If the first character is 0, replace it. Prevents "0" at start.
    if (input.startsWith('0')) {
      input = input.substring(1);
    }
  
    // Update the input field with the cleaned value
    event.target.value = input;
  }
}
