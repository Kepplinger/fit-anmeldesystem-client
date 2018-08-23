import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Booking } from '../../../core/model/booking';
import { BookingDAO } from '../../../core/dao/booking.dao';
import { EventService } from '../../../core/app-services/event.service';
import { Event } from '../../../core/model/event';
import { DataUpdateNotifier } from '../../../core/app-services/data-update-notifier';

@Injectable()
export class BookingsService {

  public bookings: BehaviorSubject<Booking[]> = new BehaviorSubject([]);
  public event: Event;

  public constructor(private bookingDAO: BookingDAO,
                     private dataUpdateNotifier: DataUpdateNotifier,
                     private eventService: EventService) {
    this.event = this.eventService.selectedEvent.getValue();
    this.eventService.selectedEvent.subscribe(e => {
      this.event = e;
      this.reloadBookings();
    });

    this.dataUpdateNotifier.bookingUpdated.subscribe(b => this.updateBooking(b));
    this.dataUpdateNotifier.bookingAdded.subscribe(b => this.addBooking(b));
  }

  public async reloadBookings(): Promise<void> {
    this.bookings.next(await this.bookingDAO.fetchAllBookingsForEvent(this.event));
  }

  public updateBooking(booking: Booking): void {
    let bookings: Booking[] = this.bookings.getValue();
    bookings[bookings.findIndex(b => b.id === booking.id)] = booking;
    this.bookings.next(bookings);
  }

  public addBooking(booking: Booking): void {
    let bookings: Booking[] = this.bookings.getValue();
    bookings.push(booking);
    this.bookings.next(bookings);
  }
}
