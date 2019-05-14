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
  public filteredChangelog: ChangeProtocol[] = [];
  public selectedCompany: Company;

  public showCompanies: boolean = true;
  public isLoading: boolean = false;

  public openedChange: ChangeProtocol = new ChangeProtocol();

  public constructor(private changeProtocolDAO: ChangeProtocolDAO) {
    super();
  }

  public async ngOnInit(): Promise<void> {
    this.changelog = await this.changeProtocolDAO.fetchChangeProtocol();
    this.setFilteredChangelog();
  }

  public setOpenedChange(change: ChangeProtocol): void {
    this.openedChange = change;
  }

  public setFilteredChangelog(): void {
    this.filteredChangelog = this.getFilteredChangelog();
  }

  public getFilteredChangelog(): ChangeProtocol[] {
    if (this.showCompanies) {
      if (this.selectedCompany != null && this.changelog != null) {
        return this.changelog.filter(c => c.companyId === this.selectedCompany.id && (c.isPending));
      } else {
        return [];
      }
    } else if (this.changelog != null) {
      return this.changelog.filter(c => c.isPending);
    } else {
      return [];
    }
  }
}
