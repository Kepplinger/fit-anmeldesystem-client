import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminToolComponent } from './admin-tool.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BookingListComponent } from './admin-dashboard/booking-list/booking-list.component';

const routes: Routes = [
  {
    path: 'hallo',
    component: AdminToolComponent
  },
  {
    outlet: 'adminOutlet',
    path: 'anmeldungen',
    component: BookingListComponent,
  },
      // {
      //   path: '',
      //   component: AdminDashboardComponent,
      //   outlet: 'adminOutlet',
      // },
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
