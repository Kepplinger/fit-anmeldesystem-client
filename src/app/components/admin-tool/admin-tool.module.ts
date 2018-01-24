import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminToolRoutingModule } from './admin-tool-routing.module';
import { AdminToolComponent } from './admin-tool.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BookingListComponent } from './admin-dashboard/booking-list/booking-list.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CreateFitEventComponent } from './admin-dashboard/create-fit-event/create-fit-event.component';

@NgModule({
  imports: [
    CommonModule,
    AdminToolRoutingModule
  ],
  declarations: [
    AdminToolComponent,
    AdminLoginComponent,
    AdminHeaderComponent,
    AdminDashboardComponent,
    BookingListComponent,
    CreateFitEventComponent
  ]
})
export class AdminToolModule {
}
