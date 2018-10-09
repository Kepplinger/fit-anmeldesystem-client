import { Component, OnDestroy, OnInit } from '@angular/core';

import { Company } from '../../../../../core/model/company';
import { CompaniesService } from '../../../services/companies.service';
import { BaseSubscriptionComponent } from '../../../../../core/base-components/base-subscription.component';

@Component({
  selector: 'fit-component-rejected-list',
  templateUrl: 'company-rejected-list.component.html',
  styleUrls: ['company-rejected-list.component.scss']
})
export class CompanyRejectedListComponent extends BaseSubscriptionComponent implements OnInit, OnDestroy {

  public rejectedCompanies: Company[];

  public constructor(private companiesService: CompaniesService) {
    super();
  }

  public ngOnInit(): void {
    this.rejectedCompanies = this.companiesService.rejectedCompanies.getValue();
    this.addSub(this.companiesService.rejectedCompanies.subscribe(c => this.rejectedCompanies = c));
  }
}
