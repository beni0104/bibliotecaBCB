import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardGridComponent } from './layout/card-grid/card-grid.component';
import { BookDetailsComponent } from './layout/book-details/book-details.component';

const routes: Routes = [
  { path: "", component: CardGridComponent},
  { path: 'bookdetails', component: BookDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
