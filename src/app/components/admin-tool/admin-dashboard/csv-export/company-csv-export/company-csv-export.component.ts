import { Component, OnInit } from '@angular/core';
import { BaseCsvExportComponent } from '../base-csv-export.component';
import { CsvCreatorService } from '../../../services/csv-creator.service';
import { Tag } from '../../../../../core/model/tag';
import { TagDAO } from '../../../../../core/dao/tag.dao';
import { CompanyTagService } from '../../../../../core/app-services/company-tag.service';
import { Company } from '../../../../../core/model/company';

@Component({
  selector: 'fit-company-csv-export',
  templateUrl: './company-csv-export.component.html',
  styleUrls: ['./company-csv-export.component.scss']
})
export class CompanyCsvExportComponent implements OnInit, BaseCsvExportComponent {

  public tags: any[] = [];
  public companies: Company[] = [];

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
                     private tagService: CompanyTagService) {
  }

  public ngOnInit(): void {
    this.tags = this.tagService.getTags().map(t => {
      return {checked: true, tag: t};
    });
    this.companies = this.csvCreatorService.getFilteredCompanies(this.tags);
  }

  public downloadCSV(): void {
    this.csvCreatorService.downloadCsvFromCompanies(this.csv);
  }

  public getEntryCount(): number {
    return this.companies.length;
  }

  public updateCompanies(): void {
    console.log(this.tags);
    this.companies = this.csvCreatorService.getFilteredCompanies(this.tags);
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
