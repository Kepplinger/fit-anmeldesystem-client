import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularDraggableModule } from 'angular2-draggable';

import { AdminToolRoutingModule } from './admin-tool-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BookingListComponent } from './admin-dashboard/booking-list/booking-list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EditFitEventComponent } from './admin-dashboard/edit-fit-event/edit-fit-event.component';
import { DateTimePickerComponent } from './admin-dashboard/edit-fit-event/date-time-picker.component/date-time-picker.component';
import { EditAreaModalComponent } from './admin-dashboard/edit-fit-event/edit-area-modal.component/edit-area-modal.component';
import { FilePickerModule } from '../../libs/file-picker/file-picker.module';
import { AcceptCompaniesComponent } from './admin-dashboard/accept-companies/accept-companies.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { SharedModule } from '../shared-components/shared.module';
import { ChangelogComponent } from './admin-dashboard/changelog/changelog.component';
import { MailTemplatesComponent } from './admin-dashboard/mail-templates/mail-templates.component';
import { BookingCsvExportComponent } from './admin-dashboard/csv-export/booking-csv-export/booking-csv-export.component';
import { PapaParseModule } from 'ngx-papaparse';
import { AcceptPresentationsComponent } from './admin-dashboard/accept-presentations/accept-presentations.component';
import { CsvCreatorService } from './services/csv-creator.service';
import { SortService } from '../../core/app-services/sort-service.service';
import { SortableColumnComponent } from '../shared-components/sortable-column/sortable-column.component';
import { SortableTableDirective } from '../shared-components/sortable-table/sortable-table.component';
import { GraduateListComponent } from './admin-dashboard/graduate-list/graduate-list.component';
import { CompanyListComponent } from './admin-dashboard/company-list/company-list.component';
import { GraduateDetailsComponent } from './admin-dashboard/graduate-list/graduate-details/graduate-details.component';
import { GraduateTransferService } from '../../core/app-services/transfer-services/graduate-transfer.service';
import { CompanyTransferService } from '../../core/app-services/transfer-services/company-transfer.service';
import { CompanyDetailsComponent } from './admin-dashboard/company-list/company-details/company-details.component';
import { AdminSettingsComponent } from './admin-dashboard/admin-settings/admin-settings.component';
import { CompanyTagService } from '../../core/app-services/company-tag.service';
import { CsvExportComponent } from './admin-dashboard/csv-export/csv-export.component';
import { GraduateCsvExportComponent } from './admin-dashboard/csv-export/graduate-csv-export/graduate-csv-export.component';
import { CompanyCsvExportComponent } from './admin-dashboard/csv-export/company-csv-export/company-csv-export.component';
import { CreateFitEventComponent } from './admin-dashboard/create-fit-event/create-fit-event.component';
import { FitRegistrationModule } from '../fit-registration/fit-registration.module';
import { PresentationDetailModalComponent } from './admin-dashboard/accept-presentations/presentation-detail-modal/presentation-detail-modal.component';
import { CompanyRejectedListComponent } from './admin-dashboard/accept-companies/copmany-rejected-list/company-rejected-list.component';
import { CompaniesService } from './services/companies.service';
import { GraduatesService } from './services/graduates.service';
import { BookingsService } from './services/bookings.service';
import { TestMailModalComponent } from './admin-dashboard/mail-templates/test-mail-modal/test-mail-modal.component';

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
    FitRegistrationModule
  ],
  declarations: [
    AdminLoginComponent,
    AdminDashboardComponent,
    AdminSettingsComponent,
    AcceptPresentationsComponent,
    BookingListComponent,
    GraduateListComponent,
    GraduateDetailsComponent,
    CompanyListComponent,
    CompanyDetailsComponent,
    CsvExportComponent,
    BookingCsvExportComponent,
    GraduateCsvExportComponent,
    CompanyCsvExportComponent,
    EditFitEventComponent,
    CreateFitEventComponent,
    EditAreaModalComponent,
    DateTimePickerComponent,
    MailTemplatesComponent,
    ChangelogComponent,
    AcceptCompaniesComponent,
    CompanyRejectedListComponent,
    SortableColumnComponent,
    SortableTableDirective,
    PresentationDetailModalComponent,
    TestMailModalComponent
  ],
  providers: [
    CsvCreatorService,
    SortService,
    GraduateTransferService,
    CompanyTransferService,
    CompanyTagService,
    CompaniesService,
    GraduatesService,
    BookingsService
  ]
})
export class AdminToolModule {
}
