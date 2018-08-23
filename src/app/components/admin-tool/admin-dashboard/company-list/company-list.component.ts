import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Company } from '../../../../core/model/company';
import { ColumnSortCriteria } from '../../../../core/app-helper/helper-model/column-sort-criteria';
import { SortHelper } from '../../../../core/app-helper/sort-helper';
import { CompanyTransferService } from '../../../../core/app-services/transfer-services/company-transfer.service';
import { getMemberStatusHTML, MemberStatus } from '../../../../core/model/enums/member-status';
import { CompaniesService } from '../../services/companies.service';
import { SubscriptionUtils } from '../../../../core/utils/subscription-utils';

@Component({
  selector: 'fit-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit, OnDestroy {

  public companies: Company[];
  public loading: boolean = true;

  private sub: Subscription;

  public constructor(private companiesService: CompaniesService,
                     private companyTransferState: CompanyTransferService,
                     private router: Router) {
  }

  public async ngOnInit(): Promise<void> {
    this.companies = this.companiesService.companies.getValue();
    this.loading = false;

    this.sub = this.companiesService.companies.subscribe(c => this.companies = c);
  }

  public ngOnDestroy(): void {
    SubscriptionUtils.unsubscribe(this.sub);
  }

  public onSorted(criteria: ColumnSortCriteria): void {
    this.companies = this.companies.sort((a, b) => SortHelper.sortHandler(a, b, criteria));
  }

  public getMemberStatusHTML(status: MemberStatus): string {
    return getMemberStatusHTML(status);
  }

  public routeToCompanyDetails(company: Company): void {
    this.companyTransferState.addCompany(company);
    this.router.navigate(['/admin-tool', 'firma', company.id]);
  }
}
