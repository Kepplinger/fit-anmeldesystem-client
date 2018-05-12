import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularDraggableModule } from 'angular2-draggable';

import { AdminToolRoutingModule } from './admin-tool-routing.module';
import { AdminToolComponent } from './admin-tool.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BookingListComponent } from './admin-dashboard/booking-list/booking-list.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EditFitEventComponent } from './admin-dashboard/create-fit-event/edit-fit-event.component';
import { DateTimePickerComponent } from './admin-dashboard/create-fit-event/date-time-picker.component/date-time-picker.component';
import { EditAreaModalComponent } from './admin-dashboard/create-fit-event/edit-area-modal.component/edit-area-modal.component';
import { FilePickerModule } from '../../libs/file-picker/file-picker.module';
import { VerifyCompaniesComponent } from './admin-dashboard/verify-companies/verify-companies.component';
import { BookingDetailsComponent } from './admin-dashboard/booking-list/booking-details/booking-details.component';
import { SelectEventModalComponent } from './admin-dashboard/select-event-modal/select-event-modal.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { SharedModule } from '../shared-components/shared.module';
import { ChangelogComponent } from './admin-dashboard/changelog/changelog.component';
import { MailTemplatesComponent } from './admin-dashboard/mail-templates/mail-templates.component';
import { BookingCsvExportComponent } from './admin-dashboard/booking-list/booking-csv-export/booking-csv-export.component';
import { PapaParseModule } from 'ngx-papaparse';
import { AcceptPresentationsComponent } from './admin-dashboard/accept-presentations/accept-presentations.component';
import {
  LocationPickerModalComponent
} from './admin-dashboard/booking-list/booking-details/location-picker-modal/location-picker-modal.component';
import { BookingCsvCreatorService } from './services/booking-csv-creator.service';
import { SortService } from '../../core/app-services/sort-service.service';
import { SortableColumnComponent } from '../shared-components/sortable-column/sortable-column.component';
import { SortableTableDirective } from '../shared-components/sortable-table/sortable-table.component';
import { GraduateListComponent } from './admin-dashboard/graduate-list/graduate-list.component';
import { CompanyListComponent } from './admin-dashboard/company-list/company-list.component';
import { GraduateDetailsComponent } from './admin-dashboard/graduate-list/graduate-details/graduate-details.component';
import { BookingTransferService } from '../../core/app-services/transfer-services/booking-transfer.service';
import { GraduateTransferService } from '../../core/app-services/transfer-services/graduate-transfer.service';
import { CompanyTransferService } from '../../core/app-services/transfer-services/company-transfer.service';
import { CompanyDetailsComponent } from './admin-dashboard/company-list/company-details/company-details.component';
import { AdminSettingsComponent } from './admin-dashboard/admin-settings/admin-settings.component';
import { CompanyTagService } from '../../core/app-services/company-tag.service';
import { CsvExportComponent } from './admin-dashboard/csv-export/csv-export.component';

@NgModule({
  imports: [
    CommonModule,
    AdminToolRoutingModule,
    AngularDraggableModule,
    FilePickerModule,
    FormsModule,
    FroalaEditorModule,
    FroalaViewModule,
    ReactiveFormsModule,
    PapaParseModule,
    SharedModule,
  ],
  declarations: [
    AdminToolComponent,
    AdminLoginComponent,
    AdminHeaderComponent,
    AdminDashboardComponent,
    AdminSettingsComponent,
    AcceptPresentationsComponent,
    BookingListComponent,
    BookingDetailsComponent,
    GraduateListComponent,
    GraduateDetailsComponent,
    CompanyListComponent,
    CompanyDetailsComponent,
    CsvExportComponent,
    EditFitEventComponent,
    EditAreaModalComponent,
    SelectEventModalComponent,
    DateTimePickerComponent,
    MailTemplatesComponent,
    BookingCsvExportComponent,
    ChangelogComponent,
    VerifyCompaniesComponent,
    LocationPickerModalComponent,
    SortableColumnComponent,
    SortableTableDirective
  ],
  providers: [
    BookingCsvCreatorService,
    SortService,
    BookingTransferService,
    GraduateTransferService,
    CompanyTransferService,
    CompanyTagService
  ]
})
export class AdminToolModule {
}
