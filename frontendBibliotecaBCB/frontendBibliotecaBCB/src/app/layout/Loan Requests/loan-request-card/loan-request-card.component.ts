import { Component, Input, PLATFORM_ID, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { LoanRequest } from '../../../interfaces/loan';
import { LoanService } from '../../../services/loan.service';

@Component({
  selector: 'app-loan-request-card',
  templateUrl: './loan-request-card.component.html',
  styleUrl: './loan-request-card.component.css'
})
export class LoanRequestCardComponent {
  @Input() loanRequest!: LoanRequest;
  constructor(private loanService: LoanService,
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object) {
      if (isPlatformBrowser(this.platformId)) {
        const browserLang = translate.getBrowserLang();
        const userLang = localStorage.getItem('userLang') ?? browserLang;
        translate.use(userLang || '');
      }
  }

  changeStatus(status: string) {
    this.loanService.updateLoanRequest(this.loanRequest, status).then((response) => {
      if(response == true)
        this.loanRequest.status = status;
    });
  }
}
