import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardGridComponent } from './layout/card-grid/card-grid.component';
import { BookDetailsComponent } from './layout/book-details/book-details.component';
import { LoginComponent } from './layout/login/login.component';
import { SignupComponent } from './layout/signup/signup.component';
import { MainPageComponent } from './layout/main-page/main-page.component';
import { sign } from 'crypto';


const routes: Routes = [
  {
    path: "home",
    component: MainPageComponent,
    children: [
      { path: "", component: CardGridComponent},
      { path: 'bookdetails', component: BookDetailsComponent },
      { path: 'login', component: LoginComponent }
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
