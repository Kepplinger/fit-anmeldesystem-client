import { Component, OnInit } from '@angular/core';
import { AccountManagementService } from '../../../core/app-services/account-managenment.service';
import { Company } from '../../../core/model/company';

@Component({
  selector: 'fit-account-header',
  templateUrl: './account-header.component.html',
  styleUrls: ['./account-header.component.scss']
})
export class AccountHeaderComponent implements OnInit {

  public company: Company;

  public constructor(private accountService: AccountManagementService) {
  }

  public ngOnInit(): void {
    this.company = this.accountService.getCompany();
  }

}
