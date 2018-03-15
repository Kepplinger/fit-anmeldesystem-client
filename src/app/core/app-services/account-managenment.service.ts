import { Injectable } from '@angular/core';
import { Company } from '../model/company';
import { Booking } from '../model/booking';

@Injectable()
export class AccountManagementService {

  public booking: Booking;

  public constructor() {
    this.booking = JSON.parse(sessionStorage.getItem('booking'));
  }

  public setBooking(booking: Booking): void {
    this.booking = booking;
    sessionStorage.setItem('booking', JSON.stringify(this.booking));
  }

  public setCompany(company: Company): void {
    this.booking = new Booking();
    this.booking.company = company;
    sessionStorage.setItem('booking', JSON.stringify(this.booking));
  }

  public getCompany(): Company {
    return this.booking.company;
  }
}
