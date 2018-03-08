import { Component, OnInit } from '@angular/core';
import { ChangeProtocol } from '../../../../core/model/change-protocol';
import { ChangeProtocolDAO } from '../../../../core/dao/change-protocol.dao';
import { Company } from '../../../../core/model/company';
import { CompanyDAO } from '../../../../core/dao/company.dao';
import { ArrayUtils } from '../../../../core/utils/array-utils';

@Component({
  selector: 'fit-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss']
})
export class ChangelogComponent implements OnInit {

  public changelog: ChangeProtocol[] = [];
  public companies: Company[] = [];
  public selectedCompany: Company;
  public showCompanies: boolean = true;

  public constructor(private changeProtocolDAO: ChangeProtocolDAO,
                     private companyDAO: CompanyDAO) {
  }

  public async ngOnInit(): Promise<void> {
    this.companies = await this.companyDAO.fetchCompanies();
    this.changelog = await this.changeProtocolDAO.fetchChangeProtocol();

    if (this.companies.length > 0) {
      this.selectCompany(ArrayUtils.getFirstElement(this.companies))
    }
  }

  public selectCompany(company: Company): void {
    this.selectedCompany = company;
  }

  public async applyChange(change: ChangeProtocol): Promise<void> {
    change = await this.changeProtocolDAO.applyChangeProtocol(change);
  }

  public async revertChange(change: ChangeProtocol): Promise<void> {
    change = await this.changeProtocolDAO.revertChangeProtocol(change);
  }

  public getChangeCountForCompany(company: Company): number {
    if (this.changelog != null) {
      return this.changelog.filter(c => c.companyId === company.id).length;
    } else {
      return 0;
    }
  }

  public getDisplayedChangelog(): ChangeProtocol[] {
    if (this.showCompanies) {
      if (this.selectedCompany != null && this.changelog != null) {
        return this.changelog.filter(c => c.companyId === this.selectedCompany.id);
      } else {
        return [];
      }
    } else {
      return this.changelog;
    }
  }
}
