import { Component } from '@angular/core';
import { LoanRequest } from '../../../interfaces/loan';
import { LoanService } from '../../../services/loan.service';

@Component({
  selector: 'app-manage-loan-requests-page',
  templateUrl: './manage-loan-requests-page.component.html',
  styleUrl: './manage-loan-requests-page.component.css'
})
export class ManageLoanRequestsPageComponent {
  loanRequests: LoanRequest[] = [];
  displayedLoanRequests: LoanRequest[] = [];
  filteredLoanRequests: LoanRequest[] = [];

  searchTerm: string = '';
  acceptedSelected: boolean = false;
  deniedSelected: boolean = false;
  processingSelected: boolean = false;

  constructor(private loanService: LoanService) {
  }

  ngOnInit() {
    this.loanService.getLoanRequests().then((loanRequests: any) => {
      this.loanRequests = loanRequests;
      this.displayedLoanRequests = loanRequests;
    });
  }

  sortLoanRequests(type: string){
    if (type === 'pickup-date') {
      this.displayedLoanRequests.sort((a, b) => {
        const dateA = new Date(a.pickupDate);
        const dateB = new Date(b.pickupDate);
        return dateA.getTime() - dateB.getTime();
      });
    } else if (type === 'requested-date') {
      this.displayedLoanRequests.sort((a, b) => {
        const dateA = new Date(a.requestedDate);
        const dateB = new Date(b.requestedDate);
        return dateA.getTime() - dateB.getTime();
      });
    }
  }

  clearFilters(){
    this.acceptedSelected = false;
    this.deniedSelected = false;
    this.processingSelected = false;
    this.displayedLoanRequests = this.loanRequests;
  }

  applyFilters(){
    if(!this.acceptedSelected && !this.deniedSelected && !this.processingSelected){
      this.displayedLoanRequests = this.loanRequests;
    } else {
      this.displayedLoanRequests = this.loanRequests.filter((loanRequest: LoanRequest) => {
        if (this.acceptedSelected && loanRequest.status === 'ACCEPTED') {
          return true;
        }
        if (this.deniedSelected && loanRequest.status === 'DENIED') {
          return true;
        }
        if (this.processingSelected && loanRequest.status === 'PROCESSING') {
          return true;
        }
        return false;
      });
    }
  }

  search(){
    if (this.searchTerm.trim() === '') {
      this.displayedLoanRequests = this.loanRequests;
    } else {
      this.displayedLoanRequests = this.loanRequests.filter((loanRequest: LoanRequest) => {
        const searchTermLower = this.searchTerm.toLowerCase();
        const bookTitleLower = (loanRequest.bookTitle ?? '').toLowerCase();
        const bookAuthorLower = (loanRequest.bookAuthor ?? '').toLowerCase();
        const userNameLower = (loanRequest.userName ?? '').toLowerCase();

        return (
          bookTitleLower.includes(searchTermLower) ||
          bookAuthorLower.includes(searchTermLower) ||
          userNameLower.includes(searchTermLower)
        );
      });
    }
  }
}
