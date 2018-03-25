import { Component, OnInit } from '@angular/core';
import { Booking } from '../../../../../core/model/booking';
import { Event } from '../../../../../core/model/event';
import { BookingTransferService } from '../../../../../core/app-services/booking-transfer.service';
import { CsvCreatorService } from '../../../services/csv-creator.service';
import { EventService } from '../../../../../core/app-services/event.service';

@Component({
  selector: 'fit-booking-csv-export',
  templateUrl: './booking-csv-export.component.html',
  styleUrls: ['./booking-csv-export.component.scss']
})
export class BookingCsvExportComponent implements OnInit {

  public bookings: Booking[];
  public event: Event;

  public constructor(private bookingTransferService: BookingTransferService,
                     private eventService: EventService,
                     private csvCreatorService: CsvCreatorService) {
  }

  public ngOnInit(): void {
    this.bookings = this.bookingTransferService.getAllBookings();
    this.bookingTransferService.clearBuffer();

    this.event = this.eventService.selectedEvent.getValue();
  }

  public downloadCSV(): void {
    this.csvCreatorService.downloadCsvFromBookings(this.bookings);
  }

}
