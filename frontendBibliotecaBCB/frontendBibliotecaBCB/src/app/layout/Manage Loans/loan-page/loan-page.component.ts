import { Component } from '@angular/core';
import { UsernameAndId } from '../../../interfaces/user';
import { LoanService } from '../../../services/loan.service';

@Component({
  selector: 'app-loan-page',
  templateUrl: './loan-page.component.html',
  styleUrl: './loan-page.component.css'
})
export class LoanPageComponent {
  userList: UsernameAndId[] = [];
  displayedUserList: UsernameAndId[] = [];
  searchTerm: string = '';

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loanService.getUsernamesAndIds().then((users: any) => {
      this.userList = users;
      this.displayedUserList = users;
    });
  }

  search() {
    if (this.searchTerm.trim() === '') {
      this.displayedUserList = this.userList;
    } else {
      this.displayedUserList = this.userList.filter(user => user.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
  }

}
