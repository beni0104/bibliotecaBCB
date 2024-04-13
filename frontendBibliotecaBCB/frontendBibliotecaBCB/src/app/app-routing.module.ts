import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardGridComponent } from './layout/card-grid/card-grid.component';
import { BookDetailsComponent } from './layout/book-details/book-details.component';
import { LoginComponent } from './layout/login/login.component';
import { SignupComponent } from './layout/signup/signup.component';
import { MainPageComponent } from './layout/main-page/main-page.component';
import { AddBooksPageComponent } from './layout/add-books-page/add-books-page.component';
import { FavoritesPageComponent } from './layout/favorites-page/favorites-page.component';
import { ManagementCardGridComponent } from './layout/management-card-grid/management-card-grid.component';
import { EditBookComponent } from './layout/edit-book/edit-book.component';
import { LoanRegisterPageComponent } from './layout/loan-register-page/loan-register-page.component';

const routes: Routes = [
  {
    path: "home",
    component: MainPageComponent,
    children: [
      { path: "", component: CardGridComponent},
      { path: 'bookdetails', component: BookDetailsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'addbooks', component: AddBooksPageComponent},
      { path: 'favoriteBooks', component: FavoritesPageComponent},
      { path: 'managebooks', component: ManagementCardGridComponent},
      { path: 'editbook', component: EditBookComponent},
      { path: 'loanRegister', component: LoanRegisterPageComponent},
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
