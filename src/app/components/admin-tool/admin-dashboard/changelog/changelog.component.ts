import { Component, OnInit } from '@angular/core';
import { ChangeProtocol } from '../../../../core/model/change-protocol';
import { ChangeProtocolDAO } from '../../../../core/dao/change-protocol.dao';
import { Company } from '../../../../core/model/company';
import { ArrayUtils } from '../../../../core/utils/array-utils';
import { CompaniesService } from '../../services/companies.service';
import { BaseSubscriptionComponent } from '../../../../core/base-components/base-subscription.component';

@Component({
  selector: 'fit-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss']
})
export class ChangelogComponent extends BaseSubscriptionComponent implements OnInit {

  public changelog: ChangeProtocol[] = [];
  public companies: Company[] = [];
  public selectedCompany: Company;

  public showCompanies: boolean = true;
  public showPendingOnly: boolean = true;
  public isLoading: boolean = false;

  public openedChange: ChangeProtocol = null;

  public constructor(private changeProtocolDAO: ChangeProtocolDAO,
                     private companiesService: CompaniesService) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    this.companies = this.companiesService.companies.getValue();
    this.addSub(this.companiesService.companies.subscribe(c => this.companies = c));

    this.isLoading = this.companiesService.isLoading.getValue();
    this.addSub(this.companiesService.isLoading.subscribe(l => this.isLoading = l));

    this.changelog = await this.changeProtocolDAO.fetchChangeProtocol();

    if (this.companies.length > 0) {
      this.selectCompany(ArrayUtils.getFirstElement(this.companies));
    }
  }

  public selectCompany(company: Company): void {
    this.selectedCompany = company;
  }

  public toggleChange(change: ChangeProtocol): void {
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

    // reload all data to prevent optimistic locking failure
    this.companiesService.reloadCompanies();
  }

  public getOrderedCompanies(): Company[] {
    return this.companies.sort((a: Company, b: Company) => {
      return this.getChangeCountForCompany(b) - this.getChangeCountForCompany(a);
    });
  }

  public getChangeCountForCompany(company: Company): number {
    if (this.changelog != null) {
      return this.changelog.filter(c => c.companyId === company.id && c.isPending).length;
    } else {
      return 0;
    }
  }

  public setShowPending(value: boolean): void {
    this.showPendingOnly = value;
  }

  public getDisplayedChangelog(): ChangeProtocol[] {
    if (this.showCompanies) {
      if (this.selectedCompany != null && this.changelog != null) {
        return this.changelog.filter(c => c.companyId === this.selectedCompany.id && (c.isPending || !this.showPendingOnly));
      } else {
        return [];
      }
    } else if (this.changelog != null) {
      return this.changelog.filter(c => c.isPending || !this.showPendingOnly);
    } else {
      return [];
    }
  }
}
