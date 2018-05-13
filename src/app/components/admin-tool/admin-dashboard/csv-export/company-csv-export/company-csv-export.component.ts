import { Component } from '@angular/core';
import { BaseCsvExportComponent } from '../base-csv-export.component';
import { CsvCreatorService } from '../../../services/csv-creator.service';

@Component({
  selector: 'fit-company-csv-export',
  templateUrl: './company-csv-export.component.html',
  styleUrls: ['./company-csv-export.component.scss']
})
export class CompanyCsvExportComponent implements BaseCsvExportComponent {

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

  public constructor(private csvCreatorService: CsvCreatorService) {
  }

  public downloadCSV(): void {
    this.csvCreatorService.downloadCsvFromCompanies(this.csv);
  }

  public getEntryCount(): number {
    return this.csvCreatorService.getCompanyCount();
  }
}
