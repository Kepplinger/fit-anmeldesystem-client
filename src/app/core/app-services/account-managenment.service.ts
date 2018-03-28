import { Injectable } from '@angular/core';
import { Company } from '../model/company';
import { Booking } from '../model/booking';

@Injectable()
export class AccountManagementService {

  public booking: Booking;
  public bookingExists: boolean;

  public constructor() {
    this.booking = JSON.parse(sessionStorage.getItem('booking'));
    this.bookingExists = JSON.parse(sessionStorage.getItem('bookingExists'));
  }

  public setBooking(booking: Booking, bookingExists: boolean): void {
    this.booking = booking;
    this.bookingExists = bookingExists;
    sessionStorage.setItem('booking', JSON.stringify(this.booking));
    sessionStorage.setItem('bookingExists', JSON.stringify(this.bookingExists));
  }

  public setCompany(company: Company): void {
    this.booking = new Booking();
    this.booking.company = company;
    sessionStorage.setItem('booking', JSON.stringify(this.booking));
    sessionStorage.setItem('bookingExists', JSON.stringify(this.bookingExists));
  }

  public getCompany(): Company {
    return this.booking.company;
  }
}
