import { Component, Input, inject, ViewChild, TemplateRef, PLATFORM_ID, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsernameAndId } from '../../../interfaces/user';
import { LoanService } from '../../../services/loan.service';
import { BookService } from '../../../services/book.service';
import { Loan } from '../../../interfaces/loan';
import { Book } from '../../../interfaces/book';

@Component({
  selector: 'app-loan-card',
  templateUrl: './loan-card.component.html',
  styleUrl: './loan-card.component.css'
})
export class LoanCardComponent {
  @ViewChild('content') contentTemplate!: TemplateRef<any>;
  private modalService = inject(NgbModal);
  modalTitle = '';
  modalMessage = '';
  currentLoan?: Loan;

  @Input() user: UsernameAndId = {name: '', id: 0};
  loanList: Loan[] = [];
  loanBooks: { [loanId: string]: Book } = {};
  temporaryReturnDates: { [loanId: string]: string } = {};
  
  showDropdown = false;

  constructor(private loanService: LoanService,
              private bookService: BookService,
              private translate: TranslateService,
              @Inject(PLATFORM_ID) private platformId: Object) {
                if (isPlatformBrowser(this.platformId)) {
                  const browserLang = translate.getBrowserLang();
                  const userLang = localStorage.getItem('userLang') ?? browserLang;
                  translate.use(userLang || '');
                }
              }
  
  ngOnInit(): void {
    if(this.user?.id){
      this.loanService.getLoans(this.user.id).then((loans: any) => {
        this.loanList = loans;
      });
    } else if(this.user?.name){
      this.loanService.getLoans(undefined, this.user.name).then((loans: any) => {
        this.loanList = loans;
      });
    }

    this.bookService.getAllBooks().then((books: any) => {

      const bookMap = new Map(books.map((book: any) => [book.id, book]));

      this.loanList.forEach((loan: any) => {
        this.loanBooks[loan.id] = bookMap.get(loan.bookId) as Book;
      });
    });
  }

  toggleDropdown(){
    this.showDropdown = !this.showDropdown;
  }

  setTemporaryDate(loanId: number, date: string): void {
    this.temporaryReturnDates[loanId] = date;
  }

  openAddReturnedDateModal(loan: any): void {
    if(this.temporaryReturnDates[loan.id] == undefined){
      this.modalTitle = 'error';
      this.modalMessage = 'select-return-date';
      this.modalService.open(this.contentTemplate);
    } else {
      this.currentLoan = loan;
      this.modalTitle = 'confirm';
      this.modalMessage = 'confirm-adding-return-date';
      this.modalService.open(this.contentTemplate);
    }
  }

  addReturnedDate(): void {
    const loan = this.currentLoan;
    if (loan) {
      const date = this.temporaryReturnDates[loan.id!];
      if (date) {
        loan.dateReturned = new Date(date);
        this.loanService.updateLoan(loan);
      }
    } else {
      console.error('No loan selected');
    }
    this.modalService.dismissAll();
  }
}
