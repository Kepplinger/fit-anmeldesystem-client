import { Component, OnInit } from '@angular/core';
import { BaseCsvExportComponent } from '../base-csv-export.component';
import { CsvCreatorService } from '../../../services/csv-creator.service';
import { CompanyTagService } from '../../../services/company-tag.service';
import { Company } from '../../../../../core/model/company';
import { BranchDAO } from '../../../../../core/dao/branch.dao';
import { Tag } from '../../../../../core/model/tag';
import { MemberStatusDAO } from '../../../../../core/dao/member-status.dao';
import { BaseSubscriptionComponent } from '../../../../../core/base-components/base-subscription.component';

@Component({
  selector: 'fit-company-csv-export',
  templateUrl: './company-csv-export.component.html',
  styleUrls: ['./company-csv-export.component.scss']
})
export class CompanyCsvExportComponent extends BaseSubscriptionComponent implements OnInit, BaseCsvExportComponent {

  public tags: any[] = [];
  public companies: Company[] = [];
  public branches: any[] = [];
  public memberStati: any[] = [];

  public useAndCondition: boolean = false;
  public isLoading: boolean = false;

  public csv: any = {
    isCompanyEnabled: true,
    isContactEnabled: true,
    company: {
      name: true,
      street: true,
      houseNumber: true,
      zipCode: true,
      location: true,
      addition: true,
      memberPaymentAmount: true,
      memberSince: true,
      memberStatus: true,
    },
    contact: {
      gender: true,
      name: true,
      email: true,
      phone: true
    },
  };

  public constructor(private csvCreatorService: CsvCreatorService,
                     private branchDAO: BranchDAO,
                     private memberStatusDAO: MemberStatusDAO,
                     private tagService: CompanyTagService) {
    super();
  }

  public async ngOnInit(): Promise<void> {

    this.isLoading = this.csvCreatorService.areCompaniesLoading.getValue();
    this.addSub(this.csvCreatorService.areCompaniesLoading.subscribe(l => this.isLoading = l));

    this.updateCompanies();

    this.tags = this.mapTags(this.tagService.tags.getValue());
    this.addSub(this.tagService.tags.subscribe(t => this.tags = this.mapTags(t)));

    this.branches = (await this.branchDAO.fetchBranches()).map(b => {
      return {checked: false, branch: b};
    });

    this.memberStati = (await this.memberStatusDAO.fetchMemberStati()).map(m => {
      return {checked: false, memberStatus: m};
    });

    this.updateCompanies();
  }

  public getMemberStatusText(): string {
    if (this.memberStati.some(b => b.checked)) {
      return 'Filter aktiv!';
    }
  }

  public getBranchFilterText(): string {
    if (this.branches.some(b => b.checked)) {
      return 'Filter aktiv!';
    }
  }

  public getTagFilterText(): string {
    if (this.tags.some(b => b.checked)) {
      return 'Filter aktiv!';
    }
  }

  public downloadCSV(): void {
    this.csvCreatorService.downloadCsvFromCompanies(
      this.csv,
      this.tags.filter(t => t.checked).map(t => t.tag),
      this.branches.filter(b => b.checked).map(b => b.branch),
      this.memberStati.filter(m => m.checked).map(m => m.memberStatus),
      this.useAndCondition
    );
  }

  public getEntryCount(): number {
    return this.companies.length;
  }

  public updateCompanies(): void {
    this.companies = this.csvCreatorService.getFilteredCompanies(
      this.tags.filter(t => t.checked).map(t => t.tag),
      this.branches.filter(b => b.checked).map(b => b.branch),
      this.memberStati.filter(m => m.checked).map(ms => ms.memberStatus),
      this.useAndCondition
    );
  }

  public uncheckAllTags(): void {
    this.tags.forEach(t => t.checked = false);
    this.updateCompanies();
  }

  public checkAllTags(): void {
    this.tags.forEach(t => t.checked = true);
    this.updateCompanies();
  }

  private mapTags(tags: Tag[]): any[] {
    return tags.map(t => {
      return {checked: false, tag: t};
    });
  }
}
