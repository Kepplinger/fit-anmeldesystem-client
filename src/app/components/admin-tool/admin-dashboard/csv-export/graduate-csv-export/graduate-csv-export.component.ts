import { Component } from '@angular/core';
import { BaseCsvExportComponent } from '../base-csv-export.component';
import { CsvCreatorService } from '../../../services/csv-creator.service';

@Component({
  selector: 'fit-graduate-csv-export',
  templateUrl: './graduate-csv-export.component.html',
  styleUrls: ['./graduate-csv-export.component.scss']
})
export class GraduateCsvExportComponent implements BaseCsvExportComponent {

  public csv: any = {
    graduate: {
      gender: true,
      name: true,
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
    this.csvCreatorService.downloadCsvFromGraduates(this.csv);
  }

  public getEntryCount(): number {
    return this.csvCreatorService.getGraduateCount();
  }
}
