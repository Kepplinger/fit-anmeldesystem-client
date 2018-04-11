import { Component, OnInit } from '@angular/core';
import { Company } from '../../../../core/model/company';
import { CompanyDAO } from '../../../../core/dao/company.dao';

@Component({
  selector: 'fit-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  public companies: Company[];

  public constructor(private companyDAO: CompanyDAO) {

  }

  public async ngOnInit(): Promise<void> {
    this.companies = await this.companyDAO.fetchCompanies();
  }

}
