import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BookingListComponent } from './admin-dashboard/booking-list/booking-list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EditFitEventComponent } from './admin-dashboard/edit-fit-event/edit-fit-event.component';
import { AcceptCompaniesComponent } from './admin-dashboard/accept-companies/accept-companies.component';
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
import { CanDeactivateGuard } from '../../core/guards/can-deactivate.guard';
import { CompanyRejectedListComponent } from './admin-dashboard/accept-companies/copmany-rejected-list/company-rejected-list.component';
import { SendMailsComponent } from './admin-dashboard/send-mails/send-mails.component';
import { IsAuthenticatedGuard } from '../../core/guards/is-authenticated.guard';
import { IsRoleGrantedGuard } from '../../core/guards/is-role-granted.guard';
import { FitUserRole } from '../../core/model/enums/fit-user-role';
import { EditFitLockedPageComponent } from './admin-dashboard/admin-settings/settings-fit-locked-page/edit-fit-locked-page/edit-fit-locked-page.component';

export const routes: Routes = [
  {
    path: 'dash',
    component: AdminDashboardComponent,
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'anmeldungen',
    component: BookingListComponent,
    canActivate: [IsAuthenticatedGuard, IsRoleGrantedGuard],
    data: {roles: [FitUserRole.FitAdmin, FitUserRole.FitReadOnly]}
  },
  {
    path: 'einstellungen',
    component: AdminSettingsComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [IsAuthenticatedGuard, IsRoleGrantedGuard],
    data: {roles: [FitUserRole.FitAdmin]}
  },
  {
    path: 'einstellungen/gesperrt-seite/:type',
    component: EditFitLockedPageComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [IsAuthenticatedGuard, IsRoleGrantedGuard],
    data: {roles: [FitUserRole.FitAdmin]}
  },
  {
    path: 'anmeldung/:id',
    component: FitRegistrationComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [IsAuthenticatedGuard, IsRoleGrantedGuard],
    data: {roles: [FitUserRole.FitAdmin]}
  },
  {
    path: 'absolventen',
    component: GraduateListComponent,
    canActivate: [IsAuthenticatedGuard, IsRoleGrantedGuard],
    data: {roles: [FitUserRole.FitAdmin, FitUserRole.FitReadOnly, FitUserRole.MemberAdmin, FitUserRole.MemberReadOnly]}
  },
  {
    path: 'absolvent/:id',
    component: GraduateDetailsComponent,
    canActivate: [IsAuthenticatedGuard, IsRoleGrantedGuard],
    data: {roles: [FitUserRole.FitAdmin, FitUserRole.MemberAdmin]}
  },
  {
    path: 'firmen',
    component: CompanyListComponent,
    canActivate: [IsAuthenticatedGuard, IsRoleGrantedGuard],
    data: {roles: [FitUserRole.FitAdmin, FitUserRole.FitReadOnly, FitUserRole.MemberAdmin, FitUserRole.MemberReadOnly]}
  },
  {
    path: 'firma/:id',
    component: CompanyDetailsComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [IsAuthenticatedGuard, IsRoleGrantedGuard],
    data: {roles: [FitUserRole.FitAdmin, FitUserRole.MemberAdmin]}
  },
  {
    path: 'fit-bearbeiten',
    component: EditFitEventComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [IsAuthenticatedGuard, IsRoleGrantedGuard],
    data: {roles: [FitUserRole.FitAdmin]}
  },
  {
    path: 'fit-anlegen',
    component: CreateFitEventComponent,
    canActivate: [IsAuthenticatedGuard, IsRoleGrantedGuard],
    data: {roles: [FitUserRole.FitAdmin]}
  },
  {
    path: 'firmen-bestaetigen',
    component: AcceptCompaniesComponent,
    canActivate: [IsAuthenticatedGuard, IsRoleGrantedGuard],
    data: {roles: [FitUserRole.FitAdmin, FitUserRole.MemberAdmin]}
  },
  {
    path: 'firmen-abgelehnt',
    component: CompanyRejectedListComponent,
    canActivate: [IsAuthenticatedGuard, IsRoleGrantedGuard],
    data: {roles: [FitUserRole.FitAdmin, FitUserRole.MemberAdmin]}
  },
  {
    path: 'aenderungsprotokoll',
    component: ChangelogComponent,
    canActivate: [IsAuthenticatedGuard, IsRoleGrantedGuard],
    data: {roles: [FitUserRole.FitAdmin, FitUserRole.MemberAdmin]}
  },
  {
    path: 'mail-vorlagen',
    component: MailTemplatesComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate: [IsAuthenticatedGuard, IsRoleGrantedGuard],
    data: {roles: [FitUserRole.FitAdmin, FitUserRole.MemberAdmin]}
  },
  {
    path: 'mails-versenden',
    component: SendMailsComponent,
    canActivate: [IsAuthenticatedGuard, IsRoleGrantedGuard],
    data: {roles: [FitUserRole.FitAdmin, FitUserRole.MemberAdmin]}
  },
  {
    path: 'csv-export',
    component: CsvExportComponent,
    canActivate: [IsAuthenticatedGuard, IsRoleGrantedGuard],
    data: {roles: [FitUserRole.FitAdmin, FitUserRole.FitReadOnly, FitUserRole.MemberAdmin, FitUserRole.MemberReadOnly]}
  },
  {
    path: 'csv-export/booking',
    component: BookingCsvExportComponent,
    canActivate: [IsAuthenticatedGuard, IsRoleGrantedGuard],
    data: {roles: [FitUserRole.FitAdmin, FitUserRole.FitReadOnly]}
  },
  {
    path: 'csv-export/absolventen',
    component: GraduateCsvExportComponent,
    canActivate: [IsAuthenticatedGuard, IsRoleGrantedGuard],
    data: {roles: [FitUserRole.FitAdmin, FitUserRole.FitReadOnly, FitUserRole.MemberAdmin, FitUserRole.MemberReadOnly]}
  },
  {
    path: 'csv-export/firmen',
    component: CompanyCsvExportComponent,
    canActivate: [IsAuthenticatedGuard, IsRoleGrantedGuard],
    data: {roles: [FitUserRole.FitAdmin, FitUserRole.FitReadOnly, FitUserRole.MemberAdmin, FitUserRole.MemberReadOnly]}
  },
  {
    path: 'vortraege',
    component: AcceptPresentationsComponent,
    canActivate: [IsAuthenticatedGuard, IsRoleGrantedGuard],
    data: {roles: [FitUserRole.FitAdmin, FitUserRole.FitReadOnly]}
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
