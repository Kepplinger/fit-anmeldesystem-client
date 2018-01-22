import { Component, OnInit } from '@angular/core';
import { BookingDAO } from '../../../core/dao/booking.dao';
import { Booking } from '../../../core/model/booking';

@Component({
  selector: 'fit-booking-list',
  templateUrl: 'booking-list.component.html',
  styleUrls: ['booking-list.component.html']
})
export class BookingListComponent implements OnInit {

  public bookings: Booking[];

  public constructor(private bookingDAO: BookingDAO) {
  }

  public async ngOnInit(): Promise<void> {
    this.bookings = await this.bookingDAO.fetchAllBookings();
  }

}
