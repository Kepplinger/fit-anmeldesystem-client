import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminToolComponent } from './admin-tool.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BookingListComponent } from './admin-dashboard/booking-list/booking-list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EditFitEventComponent } from './admin-dashboard/edit-fit-event/edit-fit-event.component';
import { VerifyCompaniesComponent } from './admin-dashboard/verify-companies/verify-companies.component';
import { ChangelogComponent } from './admin-dashboard/changelog/changelog.component';
import { MailTemplatesComponent } from './admin-dashboard/mail-templates/mail-templates.component';
import { BookingCsvExportComponent } from './admin-dashboard/csv-export/booking-csv-export/booking-csv-export.component';
import { AcceptPresentationsComponent } from './admin-dashboard/accept-presentations/accept-presentations.component';
import { GraduateListComponent } from './admin-dashboard/graduate-list/graduate-list.component';
import { CompanyListComponent } from './admin-dashboard/company-list/company-list.component';
import { GraduateDetailsComponent } from './admin-dashboard/graduate-list/graduate-details/graduate-details.component';
import { CompanyDetailsComponent } from './admin-dashboard/company-list/company-details/company-details.component';
import { AdminSettingsComponent } from './admin-dashboard/admin-settings/admin-settings.component';
import { CsvExportComponent } from './admin-dashboard/csv-export/csv-export.component';
import { GraduateCsvExportComponent } from './admin-dashboard/csv-export/graduate-csv-export/graduate-csv-export.component';
import { CompanyCsvExportComponent } from './admin-dashboard/csv-export/company-csv-export/company-csv-export.component';
import { CreateFitEventComponent } from './admin-dashboard/create-fit-event/create-fit-event.component';
import { FitRegistrationComponent } from '../fit-registration/fit-registration.component';
import { CanDeactivateGuard } from '../../core/guards/can-deactivate-guard.service';

export const routes: Routes = [
  {
    // 'children' workaround because of internal angular bug
    path: 'dash',
    component: AdminDashboardComponent
  },
  {
    path: 'anmeldungen',
    component: BookingListComponent
  },
  {
    path: 'einstellungen',
    component: AdminSettingsComponent
  },
  {
    path: 'anmeldung/:id',
    component: FitRegistrationComponent
  },
  {
    path: 'absolventen',
    component: GraduateListComponent
  },
  {
    path: 'absolvent/:id',
    component: GraduateDetailsComponent
  },
  {
    path: 'firmen',
    component: CompanyListComponent
  },
  {
    path: 'firma/:id',
    component: CompanyDetailsComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'fit-bearbeiten',
    component: EditFitEventComponent
  },
  {
    path: 'fit-anlegen',
    component: CreateFitEventComponent
  },
  {
    path: 'firmen-bestaetigen',
    component: VerifyCompaniesComponent
  },
  {
    path: 'aenderungsprotokoll',
    component: ChangelogComponent
  },
  {
    path: 'mail-vorlagen',
    component: MailTemplatesComponent
  },
  {
    path: 'csv-export',
    component: CsvExportComponent
  },
  {
    path: 'csv-export/booking',
    component: BookingCsvExportComponent
  },
  {
    path: 'csv-export/absolventen',
    component: GraduateCsvExportComponent
  },
  {
    path: 'csv-export/firmen',
    component: CompanyCsvExportComponent
  },
  {
    path: 'vortraege',
    component: AcceptPresentationsComponent
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
