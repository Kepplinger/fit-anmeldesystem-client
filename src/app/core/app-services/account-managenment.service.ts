import { Injectable } from '@angular/core';
import { Company } from '../model/company';
import { Booking } from '../model/booking';

@Injectable()
export class AccountManagementService {

  public booking: Booking;

  public constructor() {
  }

  public setBooking(booking: Booking): void {
    this.booking = booking;
  }

  public setCompany(company: Company): void {
    this.booking = new Booking();
    this.booking.company = company;
  }

  public getCompany(): Company {
    return this.booking.company;
  }
}
