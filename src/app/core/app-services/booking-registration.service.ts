import { Injectable } from '@angular/core';
import { Booking } from '../model/booking';
import { Company } from '../model/company';

@Injectable()
export class BookingRegistrationService {

  public booking: Booking = null;

  public constructor() {
  }

  public setBooking(booking: Booking): void {
    this.booking = booking;
  }

  public setCompany(company: Company): void {
    this.booking = new Booking();
    this.booking.company = company;
  }
}
