import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminToolComponent } from './admin-tool.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { BookingListComponent } from './admin-dashboard/booking-list/booking-list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EditFitEventComponent } from './admin-dashboard/create-fit-event/edit-fit-event.component';
import { VerifyCompaniesComponent } from './admin-dashboard/verify-companies/verify-companies.component';
import { BookingDetailsComponent } from './admin-dashboard/booking-list/booking-details/booking-details.component';
import { ChangelogComponent } from './admin-dashboard/changelog/changelog.component';
import { MailTemplatesComponent } from './admin-dashboard/mail-templates/mail-templates.component';
import { BookingCsvExportComponent } from './admin-dashboard/booking-list/booking-csv-export/booking-csv-export.component';
import { AcceptPresentationsComponent } from './admin-dashboard/accept-presentations/accept-presentations.component';
import { GraduateListComponent } from './admin-dashboard/graduate-list/graduate-list.component';

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
        path: 'fit-anlegen',
        children: [
          {
            path: '',
            component: EditFitEventComponent,
            outlet: 'adminOutlet'
          }
        ]
      },
      {
        path: 'absolventen',
        children: [
          {
            path: '',
            component: GraduateListComponent,
            outlet: 'adminOutlet'
          }
        ]
      },
      {
        path: 'fit-bearbeiten',
        children: [
          {
            path: '',
            component: EditFitEventComponent,
            outlet: 'adminOutlet'
          }
        ]
      },
      {
        path: 'firmen-bestaetigen',
        children: [
          {
            path: '',
            component: VerifyCompaniesComponent,
            outlet: 'adminOutlet'
          }
        ]
      },
      {
        path: 'aenderungsprotokoll',
        children: [
          {
            path: '',
            component: ChangelogComponent,
            outlet: 'adminOutlet'
          }
        ]
      },
      {
        path: 'mail-vorlagen',
        children: [
          {
            path: '',
            component: MailTemplatesComponent,
            outlet: 'adminOutlet'
          }
        ]
      },
      {
        path: 'csv-export',
        children: [
          {
            path: '',
            component: BookingCsvExportComponent,
            outlet: 'adminOutlet'
          }
        ]
      },
      {
        path: 'vortraege',
        children: [
          {
            path: '',
            component: AcceptPresentationsComponent,
            outlet: 'adminOutlet'
          }
        ]
      },
      {
        path: 'anmeldung/:id',
        children: [
          {
            path: '',
            component: BookingDetailsComponent,
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
