import { Component, OnInit } from '@angular/core';
import { Graduate } from '../../../../core/model/graduate';
import { GraduateDAO } from '../../../../core/dao/graduate.dao';
import { ColumnSortCriteria } from '../../../../core/app-helper/helper-model/column-sort-criteria';
import { SortHelper } from '../../../../core/app-helper/sort-helper';
import { GraduateTransferService } from '../../../../core/app-services/transfer-services/graduate-transfer.service';
import { Router } from '@angular/router';
import { GraduatesService } from '../../services/graduates.service';
import { BaseAdminRoleGuardComponent } from '../../../../core/base-components/base-admin-role-guard.component';
import { UserAuthorizationService } from '../../../../core/app-services/user-authorization.service';

@Component({
  selector: 'fit-graduate-list',
  templateUrl: './graduate-list.component.html',
  styleUrls: ['./graduate-list.component.scss']
})
export class GraduateListComponent extends BaseAdminRoleGuardComponent implements OnInit {

  public graduates: Graduate[];

  public isLoading: boolean = false;

  public constructor(protected adminAuthenticationService: UserAuthorizationService,
                     private graduatesService: GraduatesService,
                     private graduateTransferState: GraduateTransferService,
                     private router: Router) {
    super(adminAuthenticationService);
  }

  public async ngOnInit(): Promise<void> {
    this.graduates = this.graduatesService.graduates.getValue();
    this.graduatesService.reloadGraduates();

    this.isLoading = this.graduatesService.isLoading.getValue();
    this.addSub(this.graduatesService.isLoading.subscribe(l => this.isLoading = l));

    this.addSub(this.graduatesService.graduates.subscribe(g => this.graduates = g));
  }

  public onSorted(criteria: ColumnSortCriteria): void {
    this.graduates = this.graduates.sort((a, b) => SortHelper.sortHandler(a, b, criteria));
  }

  public routeToGraduateDetails(graduate: Graduate): void {
    this.graduateTransferState.addGraduate(graduate);
    this.router.navigate(['/admin-tool', 'absolvent', graduate.id]);
  }
}
