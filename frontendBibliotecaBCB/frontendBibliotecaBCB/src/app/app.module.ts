import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { Person } from 'ng-bootstrap-icons/icons';
import { BookCardComponent } from './layout/book-card/book-card.component';
import { CardGridComponent } from './layout/card-grid/card-grid.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BookDetailsComponent } from './layout/book-details/book-details.component';
import { FormsModule } from '@angular/forms';
import { ReviewDropdownComponent } from './layout/review-dropdown/review-dropdown.component';
import { RelatedBookCardComponent } from './layout/related-book-card/related-book-card.component';
import { LoginComponent } from './layout/login/login.component';
import { MainPageComponent } from './layout/main-page/main-page.component';
import { SignupComponent } from './layout/signup/signup.component';
import { AddBooksPageComponent } from './layout/add-books-page/add-books-page.component';
import { FavoritesPageComponent } from './layout/favorites-page/favorites-page.component';
import { GlobalAlertComponent } from './layout/global-alert/global-alert.component';
import { ManagementBookCardComponent } from './layout/management-book-card/management-book-card.component';
import { ManagementCardGridComponent } from './layout/management-card-grid/management-card-grid.component';
import { EditBookComponent } from './layout/edit-book/edit-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddLoanComponent } from './layout/add-loan/add-loan.component';

const icons = {
  Person
};

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
    AddLoanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BootstrapIconsModule.pick(icons),
    NgbPaginationModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
