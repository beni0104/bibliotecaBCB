import { Component } from '@angular/core';
import { UsernameAndId } from '../../interfaces/user';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-loan-page',
  templateUrl: './loan-page.component.html',
  styleUrl: './loan-page.component.css'
})
export class LoanPageComponent {
  userList: UsernameAndId[] = [];

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loanService.getUsernamesAndIds().then((users: any) => {
      this.userList = users;
    });
  }

}
