import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BookingTransferService } from '../../../../core/app-services/booking-transfer.service';
import { BookingDAO } from '../../../../core/dao/booking.dao';
import { Booking } from '../../../../core/model/booking';
import { EventDAO } from '../../../../core/dao/event.dao';
import { Event } from '../../../../core/model/event';

@Component({
  selector: 'fit-booking-list',
  templateUrl: 'booking-list.component.html',
  styleUrls: ['booking-list.component.html']
})
export class BookingListComponent implements OnInit {

  public bookings: Booking[];
  public events: Event[];

  public constructor(private bookingDAO: BookingDAO,
                     private router: Router,
                     private bookingTransferService: BookingTransferService,
                     private eventDAO: EventDAO) {
  }

  public async ngOnInit(): Promise<void> {
    this.bookings = await this.bookingDAO.fetchAllBookings();
    this.events = await this.eventDAO.fetchEvents();
  }

  public routeToBookingDetail(booking: Booking) {
    this.bookingTransferService.addBooking(booking);
    this.router.navigate(['anmeldung', booking.id]);
  }

}
