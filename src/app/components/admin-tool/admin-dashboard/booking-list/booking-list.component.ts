import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BookingTransferService } from '../../../../core/app-services/booking-transfer.service';
import { BookingDAO } from '../../../../core/dao/booking.dao';
import { Booking } from '../../../../core/model/booking';

@Component({
  selector: 'fit-booking-list',
  templateUrl: 'booking-list.component.html',
  styleUrls: ['booking-list.component.html']
})
export class BookingListComponent implements OnInit {

  public bookings: Booking[];

  public constructor(private bookingDAO: BookingDAO,
                     private router: Router,
                     private bookingTransferService: BookingTransferService) {
  }

  public async ngOnInit(): Promise<void> {
    this.bookings = await this.bookingDAO.fetchAllBookings();
  }

  public routeToBookingDetail(booking: Booking) {
    this.bookingTransferService.addBooking(booking);
    this.router.navigate(['/admin-tool', 'anmeldung', booking.id]);
  }

}
