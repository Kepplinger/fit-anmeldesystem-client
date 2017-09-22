import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-management-routing.module';
import { AccountManagmentComponent } from './account-management.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule
  ],
  declarations: [AccountManagmentComponent]
})
export class AccountManagementModule { }
