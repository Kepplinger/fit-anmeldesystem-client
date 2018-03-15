import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountManagmentComponent } from './account-management.component';
import { AccountOverviewComponent } from './account-overview/account-overview.component';

const routes: Routes = [
  {
    path: '',
    component: AccountManagmentComponent,
    children: [
      {
        // 'children' workaround because of internal angular bug
        path: '',
        children: [
          {
            path: '',
            component: AccountOverviewComponent,
            outlet: 'accountOutlet'
          }
        ]
      },
    ]
  },
  {
    path: 'login',
    component: AccountLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
