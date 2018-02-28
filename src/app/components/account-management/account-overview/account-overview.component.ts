import { Component, OnInit } from '@angular/core';
import { Company } from '../../../core/model/company';
import { AccountManagementService } from '../../../core/app-services/account-managenment.service';

@Component({
  selector: 'fit-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss']
})
export class AccountOverviewComponent implements OnInit {

  public company: Company;

  public constructor(private accountManagementService: AccountManagementService) {
  }

  public ngOnInit(): void {
    this.company = this.accountManagementService.getCompany();
  }
}
