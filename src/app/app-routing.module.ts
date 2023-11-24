import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCustomerComponent } from './core/list-customer/list-customer.component';
import { RegisterCustomerComponent } from './core/register-customer/register-customer.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListCustomerComponent },
  { path: 'register', component: RegisterCustomerComponent },
  { path: 'register/:cpf', component: RegisterCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
