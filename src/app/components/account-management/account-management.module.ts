import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-management-routing.module';
import { AccountLoginComponent } from './account-login/account-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { SharedModule } from '../shared-elements/shared.module';
import { AccountContainerWrapperComponent } from './account-container-wrapper/account-container-wrapper.component';
import { AccountCodeLostComponent } from './account-code-lost/account-code-lost.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    AccountOverviewComponent,
    AccountLoginComponent,
    AccountContainerWrapperComponent,
    AccountCodeLostComponent
  ],
  providers: []
})
export class AccountManagementModule {
}
