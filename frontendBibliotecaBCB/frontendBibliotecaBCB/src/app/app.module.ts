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
