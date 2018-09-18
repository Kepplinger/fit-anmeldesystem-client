import { Component } from '@angular/core';
import { BaseAdminRoleGuardComponent } from '../../../../core/base-components/base-admin-role-guard.component';
import { AdminAuthorizationService } from '../../../../core/app-services/admin-authorization.service';

@Component({
  selector: 'fit-csv-export',
  templateUrl: './csv-export.component.html',
  styleUrls: ['./csv-export.component.scss']
})
export class CsvExportComponent extends BaseAdminRoleGuardComponent {

  public constructor(protected adminAuthorizationService: AdminAuthorizationService) {
    super(adminAuthorizationService);
  }
}
