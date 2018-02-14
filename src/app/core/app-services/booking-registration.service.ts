import { Injectable } from '@angular/core';
import { Booking } from '../model/booking';
import { Company } from '../model/company';

@Injectable()
export class BookingRegistrationService {

  public booking: Booking;

  public constructor() {
    console.log('hallo');
  }

  public setBooking(booking: Booking): void {
    this.booking = booking;
  }

  public setCompany(company: Company): void {
    this.booking = new Booking();
    this.booking.company = company;
    console.log(this.booking);
  }
}
