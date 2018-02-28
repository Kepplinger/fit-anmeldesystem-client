import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-management-routing.module';
import { AccountManagmentComponent } from './account-management.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { FormsModule } from '@angular/forms';
import { AccountManagementService } from '../../core/app-services/account-managenment.service';
import { AccountOverviewComponent } from './account-overview/account-overview.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AccountRoutingModule
  ],
  declarations: [
    AccountManagmentComponent,
    AccountOverviewComponent,
    AccountLoginComponent
  ],
  providers: [
    AccountManagementService
  ]
})
export class AccountManagementModule {
}
