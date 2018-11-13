import { Component, OnInit } from '@angular/core';
import { Event } from '../../../../../core/model/event';
import { CsvCreatorService } from '../../../services/csv-creator.service';
import { EventService } from '../../../../../core/app-services/event.service';
import { BaseCsvExportComponent } from '../base-csv-export.component';
import { IsAccepted } from '../../../../../core/model/enums/is-accepted';
import { BaseSubscriptionComponent } from '../../../../../core/base-components/base-subscription.component';

@Component({
  selector: 'fit-booking-csv-export',
  templateUrl: './booking-csv-export.component.html',
  styleUrls: ['./booking-csv-export.component.scss']
})
export class BookingCsvExportComponent extends BaseSubscriptionComponent implements OnInit, BaseCsvExportComponent {

  public IsAccepted = IsAccepted;

  public event: Event;
  public isAcceptedFilter: IsAccepted = IsAccepted.Pending;

  public isLoading: boolean = false;

  public csv: any = {
    isCompanyEnabled: true,
    isContactEnabled: true,
    isBookingEnabled: true,
    isPresentationEnabled: true,
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
    },
    presentation: {
      title: true,
      description: true,
      isAccepted: true,
      branches: true
    }
  };

  public constructor(private eventService: EventService,
                     private csvCreatorService: CsvCreatorService) {
    super();
  }

  public ngOnInit(): void {
    this.event = this.eventService.selectedEvent.getValue();

    this.isLoading = this.csvCreatorService.areBookingsLoading.getValue();
    this.addSub(this.csvCreatorService.areBookingsLoading.subscribe(l => this.isLoading = l));
  }

  public getEntryCount(): number {
    return this.csvCreatorService.getBookingCount(this.isAcceptedFilter);
  }

  public downloadCSV(): void {
    this.csvCreatorService.downloadCsvFromBookings(this.csv, this.isAcceptedFilter);
  }
}
