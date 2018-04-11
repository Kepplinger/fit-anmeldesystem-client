import { Injectable } from '@angular/core';
import { Booking } from '../../model/booking';

@Injectable()
export class BookingTransferService {

  private bookingBuffer: Booking[] = [];

  public addBooking(booking: Booking): void {
    if (booking.id != null) {
      this.bookingBuffer.push(booking);
    }
  }

  public getBooking(bookingId: number): Booking {
    let booking: Booking = this.bookingBuffer.find(b => b.id === bookingId);

    if (booking != null) {
      this.bookingBuffer.splice(this.bookingBuffer.indexOf(booking), 1);
    }

    return booking;
  }
}
