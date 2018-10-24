import { Component, OnInit } from '@angular/core';
import { BaseCsvExportComponent } from '../base-csv-export.component';
import { CsvCreatorService } from '../../../services/csv-creator.service';
import { BaseSubscriptionComponent } from '../../../../../core/base-components/base-subscription.component';

@Component({
  selector: 'fit-graduate-csv-export',
  templateUrl: './graduate-csv-export.component.html',
  styleUrls: ['./graduate-csv-export.component.scss']
})
export class GraduateCsvExportComponent extends BaseSubscriptionComponent implements BaseCsvExportComponent, OnInit {

  public yearFrom: number = null;
  public yearTo: number = null;

  public isLoading: boolean = false;

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
    super();
  }

  public ngOnInit(): void {
    this.isLoading = this.csvCreatorService.areGraduatesLoading.getValue();
    this.addSub(this.csvCreatorService.areGraduatesLoading.subscribe(l => this.isLoading = l));
  }

  public downloadCSV(): void {
    this.csvCreatorService.downloadCsvFromGraduates(this.csv, this.yearFrom, this.yearTo);
  }

  public getEntryCount(): number {
    return this.csvCreatorService.getGraduateCount(this.yearFrom, this.yearTo);
  }
}
