import { Component } from '@angular/core';
import { BaseCsvExportComponent } from '../base-csv-export.component';
import { CsvCreatorService } from '../../../services/csv-creator.service';

@Component({
  selector: 'fit-graduate-csv-export',
  templateUrl: './graduate-csv-export.component.html',
  styleUrls: ['./graduate-csv-export.component.scss']
})
export class GraduateCsvExportComponent implements BaseCsvExportComponent {

  public yearFrom: number = null;
  public yearTo: number = null;

  public csv: any = {
    graduate: {
      gender: true,
      name: true,
      graduationYear: true,
      email: true,
      phone: true,
      street: true,
      houseNumber: true,
      zipCode: true,
      location: true,
      addition: true,
    },
  };

  public constructor(private csvCreatorService: CsvCreatorService) {
  }

  public downloadCSV(): void {
    this.csvCreatorService.downloadCsvFromGraduates(this.csv, this.yearFrom, this.yearTo);
  }

  public getEntryCount(): number {
    return this.csvCreatorService.getGraduateCount(this.yearFrom, this.yearTo);
  }
}
