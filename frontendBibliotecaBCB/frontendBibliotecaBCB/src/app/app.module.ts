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
import { HttpClientModule } from '@angular/common/http';
import { BookDetailsComponent } from './layout/book-details/book-details.component';
import { FormsModule } from '@angular/forms';
import { ReviewDropdownComponent } from './layout/review-dropdown/review-dropdown.component';
import { RelatedBookCardComponent } from './layout/related-book-card/related-book-card.component';
import { LoginComponent } from './layout/login/login.component';
import { MainPageComponent } from './layout/main-page/main-page.component';
import { SignupComponent } from './layout/signup/signup.component';
import { AddBooksPageComponent } from './layout/add-books-page/add-books-page.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BootstrapIconsModule.pick(icons),
    NgbPaginationModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
