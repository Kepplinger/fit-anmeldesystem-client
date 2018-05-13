import { Component, OnInit } from '@angular/core';
import { CsvCreatorService } from '../../services/csv-creator.service';

@Component({
  selector: 'fit-csv-export',
  templateUrl: './csv-export.component.html',
  styleUrls: ['./csv-export.component.scss']
})
export class CsvExportComponent implements OnInit {

  public constructor(private csvCreatorService: CsvCreatorService) {
  }

  public ngOnInit(): void {
    this.csvCreatorService.loadBookings();
    this.csvCreatorService.loadCompanies();
    this.csvCreatorService.loadGraduates();
  }

}
