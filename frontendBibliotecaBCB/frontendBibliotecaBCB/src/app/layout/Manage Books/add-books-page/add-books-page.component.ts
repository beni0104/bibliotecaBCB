import { Component, inject, ViewChild, TemplateRef, PLATFORM_ID, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookService } from '../../../services/book.service';
import { BookDTO } from '../../../interfaces/book';

@Component({
  selector: 'app-add-books-page',
  templateUrl: './add-books-page.component.html',
  styleUrl: './add-books-page.component.css'
})
export class AddBooksPageComponent {
  @ViewChild('content') contentTemplate!: TemplateRef<any>;
  private modalService = inject(NgbModal);
  selectedFile: File | null = null;
  modalTitle = '';
  modalMessage = '';
  showMainDropdown = false;

  constructor(private bookService: BookService, 
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object) {
      if (isPlatformBrowser(this.platformId)) {
        const browserLang = translate.getBrowserLang();
        const userLang = localStorage.getItem('userLang') ?? browserLang;
        translate.use(userLang || '');
      }
    }


  async onSubmit(form: any) {
    console.log(form.value);
    // Here you would typically handle the form submission to your backend
    // Don't forget to include the file upload part
    if(form.invalid) {
      this.modalTitle = 'error';
      this.modalMessage = 'all-fields-required';
      this.modalService.open(this.contentTemplate);
      return;
    } else{
      const book: BookDTO = {
        bookId: form.value.bookId,
        title: form.value.title,
        author: form.value.author,
        category: form.value.category,
        amount: form.value.amount
      }
      if (await this.bookService.createBook(book)){
        this.modalTitle = 'success';
        this.modalMessage = 'book-added-successfully';
        this.modalService.open(this.contentTemplate);  
      } else {  
        this.modalTitle = 'error';
        this.modalMessage = 'error-adding-book';
        this.modalService.open(this.contentTemplate);
      }
      
    }
  }

  toggleMainDropdown() {
    this.showMainDropdown = !this.showMainDropdown;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    // Handle file upload here
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
