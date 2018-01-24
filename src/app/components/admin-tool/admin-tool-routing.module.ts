import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminToolComponent } from './admin-tool.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BookingListComponent } from './admin-dashboard/booking-list/booking-list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminToolComponent,
    children: [
      {
        // 'children' workaround because of internal angular bug
        path: 'dash',
        children: [
          {
            path: '',
            component: AdminDashboardComponent,
            outlet: 'adminOutlet'
          }
        ]
      },
      {
        path: 'anmeldungen',
        children: [
          {
            path: '',
            component: BookingListComponent,
            outlet: 'adminOutlet'
          }
        ]
      }
    ]
  },
  {
    path: 'login',
    component: AdminLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminToolRoutingModule {
}
