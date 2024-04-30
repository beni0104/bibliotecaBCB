import { Component, inject, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from '../../../interfaces/book';
import { BookService } from '../../../services/book.service';
import { LoanService } from '../../../services/loan.service';
import { UsernameAndId } from '../../../interfaces/user';
import { Loan } from '../../../interfaces/loan';

@Component({
  selector: 'app-add-loan',
  templateUrl: './add-loan.component.html',
  styleUrl: './add-loan.component.css'
})
export class AddLoanComponent {
  @ViewChild('content') contentTemplate!: TemplateRef<any>;
  private modalService = inject(NgbModal);
  bookName = '';
  bookId = '';
  userId = '';
  userName = '';
  beginDate: Date | undefined;
  endDate: Date | undefined;
  selectedBook: Book | undefined;
  selectedUser: UsernameAndId | undefined;
  showMainDropdown = false;
  showBookDropdown = false;
  showBookIdDropdown = false;
  showUserIdDropdown = false;
  showUserNameDropdown = false;
  books: Book[] = [];
  users: UsernameAndId[] = [];
  filteredBooks: Book[] = [];
  filteredUsers: UsernameAndId[] = [];
  modalTitle = '';
  modalMessage = '';
  

  constructor(private bookService: BookService, private loanService: LoanService) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().then((data: any) => {
      this.books = data;
      this.filteredBooks = this.books;
    })
    .catch(error => { 
      console.error(error);
    });

    this.loanService.getUsernamesAndIds().then((data: any) => {
      this.users = data;
      this.filteredUsers = this.users;
    })
    .catch(error => { 
      console.error(error);
    });
    
    this.loanService.getLoans(undefined ,"Alexandru Ionescu").then((data: any) => {
      console.log(data);
    });
  }

  toggleMainDropdown() {
    this.showMainDropdown = !this.showMainDropdown;
  }

  filterOptions(type: 'book' | 'bookId' | 'userName'): void {
    if (type === 'book') {
      if(this.bookName.length > 0) {
        this.filteredBooks = this.books.filter(book =>
          book.title.toLowerCase().includes(this.bookName.toLowerCase())
        );
      } else {
        this.filteredBooks = this.books;
        this.bookId = '';
        this.selectedBook = undefined;
      }
        
    } else if (type === 'bookId') {
      if(this.bookId.length > 0) {
        this.filteredBooks = this.books.filter(book =>
          book.bookId.toString().startsWith(this.bookId)
        );
      } else {
        this.filteredBooks = this.books;
        this.bookName = '';
        this.selectedBook = undefined;
      }
    } else if (type === 'userName') {
      if(this.userName.length > 0) {
        this.filteredUsers = this.users.filter(user =>
          user.name.toLowerCase().includes(this.userName.toLowerCase())
        );
      } else {
        this.filteredUsers = this.users;
        this.userId = '';
        this.selectedUser = undefined;
      }
    }
  }

  toggleDropdown(type: 'book' | 'bookId' | 'userId' | 'userName'): void {
    if (type === 'book') {
      this.showBookDropdown = !this.showBookDropdown;
      this.showBookIdDropdown = false;
      this.showUserIdDropdown = false;
      this.showUserNameDropdown = false;
    }else if (type === 'bookId') {
      this.showBookIdDropdown = !this.showBookIdDropdown;
      this.showBookDropdown = false;
      this.showUserIdDropdown = false;
      this.showUserNameDropdown = false;
    }else if (type === 'userId') {
      this.showUserIdDropdown = !this.showUserIdDropdown;
      if (this.showUserIdDropdown) {
        this.filteredBooks = this.books;
      }
    }else if (type === 'userName') {
      this.showUserNameDropdown = !this.showUserNameDropdown;
      if (this.showUserNameDropdown) {
        this.filteredBooks = this.books;
      }
    }
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
    this.bookName = book.title;
    this.bookId = book.bookId.toString();
    this.filteredBooks = [];
    this.showBookIdDropdown = false;
    this.showBookDropdown = false;
    this.showUserIdDropdown = false;
    this.showUserNameDropdown = false;
  }

  selectUser(user: UsernameAndId): void {
    this.selectedUser = user;
    this.userName = user.name;
    if(user.id !== null)
      this.userId = user.id.toString();
    this.filteredUsers = [];
    this.showBookIdDropdown = false;
    this.showBookDropdown = false;
    this.showUserIdDropdown = false;
    this.showUserNameDropdown = false;
  }

  validateDates(): boolean {
    if (!this.beginDate) {
      console.error('Begin date myst be selected.');
      return false;
    }

    if (this.endDate && this.beginDate > this.endDate) {
      console.error('Begin Date must be before End Date.');
      return false;
    }

    return true;
  }

  onSubmit(form: any){
    console.log(form.value);
    if(!this.validateDates()) {
      this.modalTitle = 'Error';
      this.modalMessage = 'Select a valid date range';
      this.modalService.open(this.contentTemplate);
    } else if (this.selectedBook) {
        if(this.selectedUser){
          const loan: Loan = {
            userName: this.selectedUser.name,
            userId: this.selectedUser.id,
            dateLoaned: this.beginDate as Date,
            dateReturned: this.endDate as Date,
            bookId: this.selectedBook.id
          }
          this.loanService.createLoan(loan).then((data: any) => {
            this.modalTitle = 'Success';
            this.modalMessage = 'Loan registered successfully';
            this.modalService.open(this.contentTemplate);
          })
          .catch((error: any) => {
            this.modalTitle = 'Error';
            this.modalMessage = 'An error occurred while registering the loan';
            this.modalService.open(this.contentTemplate);
            console.error(error);
          });
        } else if(this.userName.length > 0) {
          const loan: Loan = {
            userName: this.userName,
            userId: -1,
            dateLoaned: this.beginDate as Date,
            dateReturned: this.endDate as Date,
            bookId: this.selectedBook.id
          }
          this.loanService.createLoan(loan).then((data: any) => {
            this.modalTitle = 'Success';
            this.modalMessage = 'Loan registered successfully';
            this.modalService.open(this.contentTemplate);
          })
          .catch((error: any) => {
            this.modalTitle = 'Error';
            this.modalMessage = 'An error occurred while registering the loan';
            this.modalService.open(this.contentTemplate);
            console.error(error);
          });
        } else {
          this.modalTitle = 'Error';
          this.modalMessage = 'Please select a user';
          this.modalService.open(this.contentTemplate);
        }
        
    } else {
        this.modalTitle = 'Error';
        this.modalMessage = 'Please select a book';
        this.modalService.open(this.contentTemplate);
      }
  }
}
