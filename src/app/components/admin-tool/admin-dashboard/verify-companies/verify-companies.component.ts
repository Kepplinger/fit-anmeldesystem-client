import { Component, OnInit } from '@angular/core';
import { Company } from '../../../../core/model/company';
import { CompanyDAO } from '../../../../core/dao/company.dao';

@Component({
  selector: 'fit-verify-companies',
  templateUrl: './verify-companies.component.html',
  styleUrls: ['./verify-companies.component.scss']
})
export class VerifyCompaniesComponent implements OnInit {

  public companies: Company[];

  public constructor(private companyDAO: CompanyDAO) {
  }

  public async ngOnInit(): Promise<void> {
    this.companies = await this.companyDAO.fetchPendingCompanies();
  }
}
