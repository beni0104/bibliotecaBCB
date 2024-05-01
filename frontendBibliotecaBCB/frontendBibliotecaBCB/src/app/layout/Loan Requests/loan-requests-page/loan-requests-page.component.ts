import { Component } from '@angular/core';
import { LoanRequest } from '../../../interfaces/loan';
import { LoanService } from '../../../services/loan.service';

@Component({
  selector: 'app-loan-requests-page',
  templateUrl: './loan-requests-page.component.html',
  styleUrl: './loan-requests-page.component.css'
})
export class LoanRequestsPageComponent {
  loanRequests: LoanRequest[] = [];

  constructor(private loanService: LoanService) {
  }

  ngOnInit() {
    this.loanService.getLoanRequests().then((loanRequests: any) => {
      this.loanRequests = loanRequests;
    });
  }
}
