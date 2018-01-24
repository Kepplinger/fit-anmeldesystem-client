import { Component, OnInit } from '@angular/core';
import { BookingDAO } from '../../../../core/dao/booking.dao';
import { Booking } from '../../../../core/model/booking';
import { EventDAO } from '../../../../core/dao/event.dao';

@Component({
  selector: 'fit-booking-list',
  templateUrl: 'booking-list.component.html',
  styleUrls: ['booking-list.component.html']
})
export class BookingListComponent implements OnInit {

  public bookings: Booking[];
  public events: Event[];

  public constructor(private bookingDAO: BookingDAO,
                     private eventDAO: EventDAO) {
  }

  public async ngOnInit(): Promise<void> {
    this.bookings = await this.bookingDAO.fetchAllBookings();
    // this.events = await this.eventDAO.fetchEvents();
  }

}
