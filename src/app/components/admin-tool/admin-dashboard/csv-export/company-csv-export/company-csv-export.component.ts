import { Component, OnInit } from '@angular/core';
import { BaseCsvExportComponent } from '../base-csv-export.component';
import { CsvCreatorService } from '../../../services/csv-creator.service';
import { CompanyTagService } from '../../../../../core/app-services/company-tag.service';
import { Company } from '../../../../../core/model/company';
import { BranchDAO } from '../../../../../core/dao/branch.dao';

@Component({
  selector: 'fit-company-csv-export',
  templateUrl: './company-csv-export.component.html',
  styleUrls: ['./company-csv-export.component.scss']
})
export class CompanyCsvExportComponent implements OnInit, BaseCsvExportComponent {

  public tags: any[] = [];
  public companies: Company[] = [];
  public branches: any[] = [];

  public useAndCondition: boolean = false;

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
                     private tagService: CompanyTagService) {
  }

  public async ngOnInit(): Promise<void> {

    this.updateCompanies();

    this.tags = this.tagService.getTags().map(t => {
      return {checked: false, tag: t};
    });

    this.branches = (await this.branchDAO.fetchBranches()).map(b => {
      return {checked: false, branch: b};
    });

    this.updateCompanies();
  }

  public getBranchFilterText(): string {
    if (!this.branches.every(b => !b.checked)) {
      return 'Filter aktiv!';
    }
  }

  public getTagFilterText(): string {
    if (!this.tags.every(b => !b.checked)) {
      return 'Filter aktiv!';
    }
  }

  public downloadCSV(): void {
    this.csvCreatorService.downloadCsvFromCompanies(
      this.csv,
      this.tags.filter(t => t.checked).map(t => t.tag),
      this.branches.filter(b => b.checked).map(b => b.branch),
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
}
