import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Person } from 'ng-bootstrap-icons/icons';
import { BookCardComponent } from './layout/book-card/book-card.component';
import { CardGridComponent } from './layout/card-grid/card-grid.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { BookDetailsComponent } from './layout/Book Details/book-details/book-details.component';
import { FormsModule } from '@angular/forms';
import { ReviewDropdownComponent } from './layout/Book Details/review-dropdown/review-dropdown.component';
import { RelatedBookCardComponent } from './layout/Book Details/related-book-card/related-book-card.component';
import { LoginComponent } from './layout/Authentication/login/login.component';
import { MainPageComponent } from './layout/main-page/main-page.component';
import { SignupComponent } from './layout/Authentication/signup/signup.component';
import { AddBooksPageComponent } from './layout/Manage Books/add-books-page/add-books-page.component';
import { FavoritesPageComponent } from './layout/favorites-page/favorites-page.component';
import { GlobalAlertComponent } from './layout/global-alert/global-alert.component';
import { ManagementBookCardComponent } from './layout/Manage Books/management-book-card/management-book-card.component';
import { ManagementCardGridComponent } from './layout/Manage Books/management-card-grid/management-card-grid.component';
import { EditBookComponent } from './layout/Manage Books/edit-book/edit-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddLoanComponent } from './layout/Manage Loans/add-loan/add-loan.component';
import { LoanCardComponent } from './layout/Manage Loans/loan-card/loan-card.component';
import { LoanPageComponent } from './layout/Manage Loans/loan-page/loan-page.component';
import { LoanRequestCardComponent } from './layout/Loan Requests/loan-request-card/loan-request-card.component';
import { ManageLoanRequestsPageComponent } from './layout/Loan Requests/manage-loan-requests-page/manage-loan-requests-page.component';
import { LoanRequestsPageComponent } from './layout/Loan Requests/loan-requests-page/loan-requests-page.component';
import { environment } from '../environments/environment';
import { IsbnScannerComponent } from './layout/Manage Books/isbn-scanner/isbn-scanner.component';

const icons = {
  Person
};

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `./assets/i18n/`, '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    BookCardComponent,
    CardGridComponent,
    BookDetailsComponent,
    ReviewDropdownComponent,
    RelatedBookCardComponent,
    LoginComponent,
    MainPageComponent,
    SignupComponent,
    AddBooksPageComponent,
    FavoritesPageComponent,
    GlobalAlertComponent,
    ManagementBookCardComponent,
    ManagementCardGridComponent,
    EditBookComponent,
    AddLoanComponent,
    LoanCardComponent,
    LoanPageComponent,
    LoanRequestCardComponent,
    LoanRequestsPageComponent,
    ManageLoanRequestsPageComponent,
    IsbnScannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BootstrapIconsModule.pick(icons),
    NgbPaginationModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
