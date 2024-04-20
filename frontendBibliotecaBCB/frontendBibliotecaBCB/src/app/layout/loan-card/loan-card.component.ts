import { Component, Input } from '@angular/core';
import { UsernameAndId } from '../../interfaces/user';
import { LoanService } from '../../services/loan.service';
import { Loan } from '../../interfaces/loan';

@Component({
  selector: 'app-loan-card',
  templateUrl: './loan-card.component.html',
  styleUrl: './loan-card.component.css'
})
export class LoanCardComponent {
  @Input() user: UsernameAndId = {name: '', id: 0};
  loanList: Loan[] = [];
  
  showDropdown = false;

  constructor(private loanService: LoanService) {}
  
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
  }

  toggleDropdown(){
    this.showDropdown = !this.showDropdown;
  }

  // showAddReturnedDateButton(): boolean {
  //   return !this.loan.returnedDate;
  // }

  addReturnedDate(): void {
    // this.loan.returnedDate = new Date();
  }
}
