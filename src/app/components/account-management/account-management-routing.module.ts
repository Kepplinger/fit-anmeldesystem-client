import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountManagmentComponent } from './account-management.component';

const routes: Routes = [
  {
    path: '',
    component: AccountManagmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
