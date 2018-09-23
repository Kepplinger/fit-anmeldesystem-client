import { Component } from '@angular/core';
import { BaseAdminRoleGuardComponent } from '../../../../core/base-components/base-admin-role-guard.component';
import { UserAuthorizationService } from '../../../../core/app-services/user-authorization.service';

@Component({
  selector: 'fit-csv-export',
  templateUrl: './csv-export.component.html',
  styleUrls: ['./csv-export.component.scss']
})
export class CsvExportComponent extends BaseAdminRoleGuardComponent {

  public constructor(protected userAuthorizationService: UserAuthorizationService) {
    super(userAuthorizationService);
  }
}
