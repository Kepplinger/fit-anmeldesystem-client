import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminToolRoutingModule } from './admin-tool-routing.module';
import { AdminToolComponent } from './admin-tool.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BookingListComponent } from './admin-dashboard/booking-list/booking-list.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CreateFitEventComponent } from './admin-dashboard/create-fit-event/create-fit-event.component';
import { DateTimePickerComponent } from './admin-dashboard/date-time-picker.component.ts/date-time-picker.component';
import { EditAreaModalComponent } from './admin-dashboard/create-fit-event/edit-area-modal.component/edit-area-modal.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { SharedModule } from '../shared-components/shared.module';
import { CoreModule } from '../../core/core.module';
import { FilePickerModule } from '../../libs/file-picker/file-picker.module';

@NgModule({
  imports: [
    CommonModule,
    AdminToolRoutingModule,
    AngularDraggableModule,
    FilePickerModule
  ],
  declarations: [
    AdminToolComponent,
    AdminLoginComponent,
    AdminHeaderComponent,
    AdminDashboardComponent,
    BookingListComponent,
    CreateFitEventComponent,
    EditAreaModalComponent,
    DateTimePickerComponent
  ]
})
export class AdminToolModule {
}
