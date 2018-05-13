import { Component, OnInit } from '@angular/core';
import { Event } from '../../../../../core/model/event';
import { CsvCreatorService } from '../../../services/csv-creator.service';
import { EventService } from '../../../../../core/app-services/event.service';
import { BaseCsvExportComponent } from '../base-csv-export.component';

@Component({
  selector: 'fit-booking-csv-export',
  templateUrl: './booking-csv-export.component.html',
  styleUrls: ['./booking-csv-export.component.scss']
})
export class BookingCsvExportComponent implements OnInit, BaseCsvExportComponent {

  public event: Event;

  public csv: any = {
    isCompanyEnabled: true,
    isContactEnabled: true,
    isBookingEnabled: true,
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
    booking: {
      branch: true,
      phone: true,
      email: true,
      homepage: true,
      establishments: true,
      isAccepted: true,
      remarks: true,
      additionalInfo: true,
      companyDescription: true,
      providesSummerJob: true,
      providesThesis: true,
      package: true,
      representatives: true,
      location: true,
      desiredBranches: true,
      resources: true
    }
  };

  public constructor(private eventService: EventService,
                     private csvCreatorService: CsvCreatorService) {
  }

  public ngOnInit(): void {
    this.event = this.eventService.selectedEvent.getValue();
  }

  public getEntryCount(): number {
    return this.csvCreatorService.getBookingCount();
  }

  public downloadCSV(): void {
    this.csvCreatorService.downloadCsvFromBookings(this.csv);
  }

}
