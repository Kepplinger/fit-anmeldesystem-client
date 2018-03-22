import { Component, Input, OnInit } from '@angular/core';
import { Booking } from '../../../../../core/model/booking';
import { BookingTransferService } from '../../../../../core/app-services/booking-transfer.service';
import { CsvCreatorService } from '../../../services/csv-creator.service';

@Component({
  selector: 'fit-booking-csv-export',
  templateUrl: './booking-csv-export.component.html',
  styleUrls: ['./booking-csv-export.component.scss']
})
export class BookingCsvExportComponent implements OnInit {

  public bookings: Booking[];

  public constructor(private bookingTransferService: BookingTransferService,
                     private csvCreatorService: CsvCreatorService) {
  }

  public ngOnInit(): void {
    this.bookings = this.bookingTransferService.getAllBookings();
    this.bookingTransferService.clearBuffer();

    console.log(this.csvCreatorService.downloadCsvFromBookings(this.bookings));
  }

}
