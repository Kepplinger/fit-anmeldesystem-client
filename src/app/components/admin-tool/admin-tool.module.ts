import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularDraggableModule } from 'angular2-draggable';

import { AdminToolRoutingModule } from './admin-tool-routing.module';
import { AdminToolComponent } from './admin-tool.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BookingListComponent } from './admin-dashboard/booking-list/booking-list.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CreateFitEventComponent } from './admin-dashboard/create-fit-event/create-fit-event.component';
import { DateTimePickerComponent } from './admin-dashboard/date-time-picker.component/date-time-picker.component';
import { EditAreaModalComponent } from './admin-dashboard/create-fit-event/edit-area-modal.component/edit-area-modal.component';
import { FilePickerModule } from '../../libs/file-picker/file-picker.module';
import { VerifyCompaniesComponent } from './admin-dashboard/verify-companies/verify-companies.component';
import { BookingTransferService } from '../../core/app-services/booking-transfer.service';
import { BookingDetailsComponent } from './admin-dashboard/booking-list/booking-details/booking-details.component';

@NgModule({
  imports: [
    CommonModule,
    AdminToolRoutingModule,
    AngularDraggableModule,
    FilePickerModule,
    FormsModule
  ],
  declarations: [
    AdminToolComponent,
    AdminLoginComponent,
    AdminHeaderComponent,
    AdminDashboardComponent,
    BookingListComponent,
    BookingDetailsComponent,
    CreateFitEventComponent,
    EditAreaModalComponent,
    DateTimePickerComponent,
    VerifyCompaniesComponent
  ]
})
export class AdminToolModule {
}
