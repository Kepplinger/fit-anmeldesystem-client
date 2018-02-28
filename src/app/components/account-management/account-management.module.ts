import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-management-routing.module';
import { AccountManagmentComponent } from './account-management.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AccountRoutingModule
  ],
  declarations: [
    AccountManagmentComponent,
    AccountLoginComponent
  ]
})
export class AccountManagementModule {
}
