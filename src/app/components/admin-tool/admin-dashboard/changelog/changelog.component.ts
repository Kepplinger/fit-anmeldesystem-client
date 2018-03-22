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

  public openedChange: ChangeProtocol = null;

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

  public toggleChange(change: ChangeProtocol): void {
    console.log('ahhh');
    if (this.openedChange === change) {
      this.openedChange = null;
    } else {
      this.openedChange = change;
    }
  }

  public async applyChange(change: ChangeProtocol): Promise<void> {
    let newChange = await this.changeProtocolDAO.applyChangeProtocol(change);
    ArrayUtils.replaceElement(change, newChange, this.changelog);
  }

  public async revertChange(change: ChangeProtocol): Promise<void> {
    let newChange = await this.changeProtocolDAO.revertChangeProtocol(change);
    ArrayUtils.replaceElement(change, newChange, this.changelog);
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
