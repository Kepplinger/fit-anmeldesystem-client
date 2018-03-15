import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-management-routing.module';
import { AccountManagmentComponent } from './account-management.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountManagementService } from '../../core/app-services/account-managenment.service';
import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { AccountHeaderComponent } from './account-header/account-header.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AccountManagmentComponent,
    AccountOverviewComponent,
    AccountLoginComponent,
    AccountHeaderComponent
  ],
  providers: [
    AccountManagementService
  ]
})
export class AccountManagementModule {
}
