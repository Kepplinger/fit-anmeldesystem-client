import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Company } from '../../../../../core/model/company';
import { CompaniesService } from '../../../services/companies.service';
import { SubscriptionUtils } from '../../../../../core/utils/subscription-utils';

@Component({
  selector: 'fit-component-rejected-list',
  templateUrl: 'company-rejected-list.component.html',
  styleUrls: ['company-rejected-list.component.scss']
})
export class CompanyRejectedListComponent implements OnInit, OnDestroy {

  public rejectedCompanies: Company[];
  private sub: Subscription;

  public constructor(private companiesService: CompaniesService) {
  }

  public ngOnInit(): void {
    this.rejectedCompanies = this.companiesService.rejectedCompanies.getValue();
    this.sub = this.companiesService.rejectedCompanies.subscribe(c => this.rejectedCompanies = c);
  }

  public ngOnDestroy(): void {
    SubscriptionUtils.unsubscribe(this.sub);
  }
}
