import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardGridComponent } from './layout/card-grid/card-grid.component';
import { BookDetailsComponent } from './layout/Book Details/book-details/book-details.component';
import { LoginComponent } from './layout/Authentication/login/login.component';
import { SignupComponent } from './layout/Authentication/signup/signup.component';
import { MainPageComponent } from './layout/main-page/main-page.component';
import { FavoritesPageComponent } from './layout/favorites-page/favorites-page.component';
import { ManagementCardGridComponent } from './layout/Manage Books/management-card-grid/management-card-grid.component';
import { EditBookComponent } from './layout/Manage Books/edit-book/edit-book.component';
import { LoanPageComponent } from './layout/Manage Loans/loan-page/loan-page.component';
import { ManageLoanRequestsPageComponent } from './layout/Loan Requests/manage-loan-requests-page/manage-loan-requests-page.component';
import { LoanRequestsPageComponent } from './layout/Loan Requests/loan-requests-page/loan-requests-page.component';
import { authGuard } from './guard/auth.guard';
import { adminGuard } from './guard/admin.guard';

const routes: Routes = [
  {
    path: "home",
    component: MainPageComponent,
    children: [
      { path: "", component: CardGridComponent},
      { path: 'bookdetails', component: BookDetailsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'favoriteBooks', component: FavoritesPageComponent, canActivate: [authGuard]},
      { path: 'loanRequests', component: LoanRequestsPageComponent, canActivate: [authGuard]},
      { path: 'managebooks', component: ManagementCardGridComponent, canActivate: [adminGuard]},
      { path: 'editbook', component: EditBookComponent, canActivate: [adminGuard]},
      { path: 'manageLoans', component: LoanPageComponent, canActivate: [adminGuard]},
      { path: 'manageLoanRequests', component: ManageLoanRequestsPageComponent, canActivate: [adminGuard]}
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
