import { Injectable } from '@angular/core';
import { Company } from '../model/company';
import { Booking } from '../model/booking';
import { Graduate } from '../model/graduate';
import { Subject } from 'rxjs';
import { MemberLoginResponse } from '../app-helper/helper-model/member-login-response';
import { BookingMapper } from '../model/mapper/booking-mapper';
import { CompanyMapper } from '../model/mapper/company-mapper';

@Injectable()
export class AccountManagementService {

  public booking: Booking;
  public graduate: Graduate;

  public currentBookingExists: boolean;
  public isGraduate: boolean = false;

  public bookingFilled: Subject<void> = new Subject<void>();

  public constructor() {
    this.graduate = JSON.parse(sessionStorage.getItem('graduate'));
    this.booking = JSON.parse(sessionStorage.getItem('booking'));
    this.currentBookingExists = JSON.parse(sessionStorage.getItem('currentBookingExists'));
    this.isGraduate = JSON.parse(sessionStorage.getItem('isGraduate'));
  }

  public loginMember(response: MemberLoginResponse): void {
    if (response.graduate != null) {
      this.setGraduate(response.graduate);
    } else if (response.oldBooking != null) {
      this.setBooking(BookingMapper.mapJsonToBooking(response.oldBooking), false);
    } else if (response.currentBooking != null) {
      this.setBooking(BookingMapper.mapJsonToBooking(response.currentBooking), true);
    } else if (response.company != null) {
      this.setCompany(CompanyMapper.mapJsonToCompany(response.company));
    }
  }

  public setGraduate(graduate: Graduate): void {
    this.graduate = graduate;
    this.isGraduate = true;
    this.updateSessionStorage();
  }

  public setBooking(booking: Booking, bookingExists: boolean): void {
    this.booking = booking;
    this.currentBookingExists = bookingExists;
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

  public bookingIsFilled(): void {
    this.bookingFilled.next();
  }

  private updateSessionStorage(): void {
    sessionStorage.setItem('graduate', JSON.stringify(this.graduate));
    sessionStorage.setItem('booking', JSON.stringify(this.booking));
    sessionStorage.setItem('currentBookingExists', JSON.stringify(this.currentBookingExists));
    sessionStorage.setItem('isGraduate', JSON.stringify(this.isGraduate));
  }
}
