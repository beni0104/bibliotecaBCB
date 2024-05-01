import { Component, Input } from '@angular/core';
import { LoanRequest } from '../../../interfaces/loan';
import { LoanService } from '../../../services/loan.service';

@Component({
  selector: 'app-loan-request-card',
  templateUrl: './loan-request-card.component.html',
  styleUrl: './loan-request-card.component.css'
})
export class LoanRequestCardComponent {
  @Input() loanRequest!: LoanRequest;
  constructor(private loanService: LoanService) { }

  changeStatus(status: string) {
    this.loanService.updateLoanRequest(this.loanRequest, status).then((response) => {
      if(response == true)
        this.loanRequest.status = status;
    });
  }
}
