import { Component, OnInit } from '@angular/core';
import { ChangeProtocol } from '../../../../core/model/change-protocol';
import { ChangeProtocolDAO } from '../../../../core/dao/change-protocol.dao';
import { Company } from '../../../../core/model/company';
import { CompanyDAO } from '../../../../core/dao/company.dao';

@Component({
  selector: 'fit-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss']
})
export class ChangelogComponent implements OnInit {

  public changelog: ChangeProtocol[];
  public companies: Company[];
  public selectedCompany: Company;

  public constructor(private changeProtocolDAO: ChangeProtocolDAO,
                     private companyDAO: CompanyDAO) {
  }

  public async ngOnInit(): Promise<void> {
    this.companies = await this.companyDAO.fetchCompanies();
    this.changelog = await this.changeProtocolDAO.fetchChangeProtocol();
  }

  public selectCompany(company: Company): void {
    this.selectedCompany = company;
  }
}
