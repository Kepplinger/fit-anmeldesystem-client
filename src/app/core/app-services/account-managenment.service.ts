import { Injectable } from '@angular/core';
import { Company } from '../model/company';
import { Booking } from '../model/booking';
import { Graduate } from '../model/graduate';

@Injectable()
export class AccountManagementService {

  public booking: Booking;
  public bookingExists: boolean;
  public graduate: Graduate;

  public isGraduate: boolean = false;

  public constructor() {
    this.graduate = JSON.parse(sessionStorage.getItem('graduate'));
    this.booking = JSON.parse(sessionStorage.getItem('booking'));
    this.bookingExists = JSON.parse(sessionStorage.getItem('bookingExists'));
    this.isGraduate = JSON.parse(sessionStorage.getItem('isGraduate'));
  }

  public setGraduate(graduate: Graduate): void {
    this.graduate = graduate;
    this.isGraduate = true;
    this.updateSessionStorage();
  }

  public setBooking(booking: Booking, bookingExists: boolean): void {
    this.booking = booking;
    this.bookingExists = bookingExists;
    this.isGraduate = false;
    this.updateSessionStorage();
  }

  public setCompany(company: Company): void {
    this.booking = new Booking();
    this.booking.company = company;
    this.isGraduate = false;
    this.updateSessionStorage();
  }

  public getCompany(): Company {
    if (this.booking != null) {
      return this.booking.company;
    } else {
      return null;
    }
  }

  private updateSessionStorage(): void {
    sessionStorage.setItem('graduate', JSON.stringify(this.graduate));
    sessionStorage.setItem('booking', JSON.stringify(this.booking));
    sessionStorage.setItem('bookingExists', JSON.stringify(this.bookingExists));
    sessionStorage.setItem('isGraduate', JSON.stringify(this.isGraduate));
  }
}
