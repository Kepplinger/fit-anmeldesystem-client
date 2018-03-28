import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BookingTransferService } from '../../../../core/app-services/booking-transfer.service';
import { BookingDAO } from '../../../../core/dao/booking.dao';
import { Booking } from '../../../../core/model/booking';
import { EventService } from '../../../../core/app-services/event.service';
import { AppConfig } from '../../../../core/app-config/app-config.service';
import { CsvCreatorService } from '../../services/csv-creator.service';

@Component({
  selector: 'fit-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {

  public bookings: Booking[];
  public loading: boolean = true;
  public imageDownloadLink: string;

  public constructor(private bookingDAO: BookingDAO,
                     private eventService: EventService,
                     private appConfig: AppConfig,
                     private router: Router,
                     private bookingTransferService: BookingTransferService,
                     private csvCreatorService: CsvCreatorService) {
    this.imageDownloadLink = this.appConfig + '/media';
  }

  public async ngOnInit(): Promise<void> {
    this.bookings = await this.bookingDAO.fetchAllBookings();
    this.loading = false;
  }

  public routeToCsvExport(): void {
    this.csvCreatorService.setBookings(this.bookings);
    this.router.navigate(['/admin-tool', 'csv-export']);
  }

  public routeToBookingDetail(booking: Booking): void {
    this.bookingTransferService.addBooking(booking);
    this.router.navigate(['/admin-tool', 'anmeldung', booking.id]);
  }

}
