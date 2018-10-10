import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Company } from '../../../../core/model/company';
import { ColumnSortCriteria } from '../../../../core/app-helper/helper-model/column-sort-criteria';
import { SortHelper } from '../../../../core/app-helper/sort-helper';
import { CompanyTransferService } from '../../../../core/app-services/transfer-services/company-transfer.service';
import { CompaniesService } from '../../services/companies.service';
import { SubscriptionUtils } from '../../../../core/utils/subscription-utils';
import { UserAuthorizationService } from '../../../../core/app-services/user-authorization.service';
import { BaseAdminRoleGuardComponent } from '../../../../core/base-components/base-admin-role-guard.component';

@Component({
  selector: 'fit-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent extends BaseAdminRoleGuardComponent implements OnInit, OnDestroy {

  public companies: Company[];
  public isLoading: boolean = false;

  private sub: Subscription;

  public constructor(protected adminAuthenticationService: UserAuthorizationService,
                     private companiesService: CompaniesService,
                     private companyTransferState: CompanyTransferService,
                     private router: Router) {
    super(adminAuthenticationService);
  }

  public async ngOnInit(): Promise<void> {
    this.companies = this.companiesService.companies.getValue();
    this.companiesService.reloadCompanies();

    if (this.companies.length === 0) {
      this.isLoading = this.companiesService.isLoading.getValue();
      this.addSub(this.companiesService.isLoading.subscribe(l => this.isLoading = l));
    }

    this.addSub(this.sub = this.companiesService.companies.subscribe(c => this.companies = c));
  }

  public ngOnDestroy(): void {
    SubscriptionUtils.unsubscribe(this.sub);
  }

  public onSorted(criteria: ColumnSortCriteria): void {
    this.companies = this.companies.sort((a, b) => SortHelper.sortHandler(a, b, criteria));
  }

  public routeToCompanyDetails(company: Company): void {
    this.companyTransferState.addCompany(company);
    this.router.navigate(['/admin-tool', 'firma', company.id]);
  }
}
