import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { AccountCodeLostComponent } from './account-code-lost/account-code-lost.component';
import { CanDeactivateGuard } from '../../core/guards/can-deactivate.guard';
import { IsRoleGrantedGuard } from '../../core/guards/is-role-granted.guard';
import { FitUserRole } from '../../core/model/enums/fit-user-role';

const routes: Routes = [
  {
    path: '',
    component: AccountOverviewComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [IsRoleGrantedGuard],
    data: {roles: [FitUserRole.Member]}
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
