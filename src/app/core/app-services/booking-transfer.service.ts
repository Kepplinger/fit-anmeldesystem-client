import { Injectable } from '@angular/core';
import { Booking } from '../model/booking';
import { ArrayUtils } from '../utils/array-utils';

@Injectable()
export class BookingTransferService {

  private bookingBuffer: Booking[] = [];

  public addBooking(booking: Booking): void {
    if (booking.id != null) {
      this.bookingBuffer.push(booking);
      console.log(this.bookingBuffer);
    }
  }

  public getBooking(bookingId: number): Booking {
    console.log(this.bookingBuffer);
    console.log(bookingId);
    let booking: Booking = ArrayUtils.getFirstElement(this.bookingBuffer.filter(b => b.id === bookingId));
    console.log(booking);

    if (booking != null) {
      this.bookingBuffer.splice(this.bookingBuffer.indexOf(booking), 1);
    }
    console.log(booking);

    return booking;
  }
}
