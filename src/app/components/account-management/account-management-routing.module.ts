import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { AccountCodeLostComponent } from './account-code-lost/account-code-lost.component';
import { CanDeactivateGuard } from '../../core/guards/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AccountOverviewComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'login',
    component: AccountLoginComponent
  },
  {
    path: 'code-vergessen',
    component: AccountCodeLostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
