import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminToolRoutingModule } from './admin-tool-routing.module';
import { AdminToolComponent } from './admin-tool.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BookingListComponent } from './booking-list/booking-list.component';

@NgModule({
  imports: [
    CommonModule,
    AdminToolRoutingModule
  ],
  declarations: [
    AdminToolComponent,
    AdminLoginComponent,
    BookingListComponent
  ]
})
export class AdminToolModule {
}
