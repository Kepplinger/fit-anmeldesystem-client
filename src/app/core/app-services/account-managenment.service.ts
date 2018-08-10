import { Injectable } from '@angular/core';
import { Company } from '../model/company';
import { Booking } from '../model/booking';
import { Graduate } from '../model/graduate';
import { Subject } from 'rxjs';
import { MemberLoginResponse } from '../app-helper/helper-model/member-login-response';
import { BookingMapper } from '../model/mapper/booking-mapper';
import { CompanyMapper } from '../model/mapper/company-mapper';
import { tryCatch } from 'rxjs/internal-compatibility';

@Injectable()
export class AccountManagementService {

  public booking: Booking;
  public graduate: Graduate;

  public currentBookingExists: boolean;
  public isAdminMode: boolean = false;
  public isGraduate: boolean = false;

  public bookingFilled: Subject<void> = new Subject<void>();

  public constructor() {
    this.graduate = JSON.parse(sessionStorage.getItem('graduate'));
    this.booking = JSON.parse(sessionStorage.getItem('booking'));
    this.currentBookingExists = JSON.parse(sessionStorage.getItem('currentBookingExists'));
    this.isAdminMode = JSON.parse(sessionStorage.getItem('isAdminMode'));
    this.isGraduate = JSON.parse(sessionStorage.getItem('isGraduate'));
  }

  public loginMember(response: MemberLoginResponse, companyOnly: boolean = false): boolean {
    if (response.graduate != null && !companyOnly) {
      this.setGraduate(response.graduate);
      return true;
    } else if (response.oldBooking != null) {
      this.setBooking(BookingMapper.mapJsonToBooking(response.oldBooking), false);
      return true;
    } else if (response.currentBooking != null) {
      this.setBooking(BookingMapper.mapJsonToBooking(response.currentBooking), true);
      return true;
    } else if (response.company != null) {
      this.setCompanyWithoutBooking(CompanyMapper.mapJsonToCompany(response.company));
      return true;
    } else if (response.adminBooking != null) {
      this.setAdminBooking(response.adminBooking);
      return true;
    }

    return false;
  }

  public logoutMember(): void {
    this.booking = null;
    this.graduate = null;
    this.currentBookingExists = false;
    this.updateSessionStorage();
  }

  public setGraduate(graduate: Graduate): void {
    this.graduate = graduate;
    this.isGraduate = true;
    this.isAdminMode = false;
    this.updateSessionStorage();
  }

  public setBooking(booking: Booking, bookingExists: boolean): void {
    this.booking = booking;
    this.currentBookingExists = bookingExists;
    this.isGraduate = false;
    this.isAdminMode = false;
    this.updateSessionStorage();
  }

  public setCompanyWithoutBooking(company: Company): void {
    this.booking = new Booking();
    this.booking.company = company;
    this.currentBookingExists = false;
    this.isGraduate = false;
    this.isAdminMode = false;
    this.updateSessionStorage();
  }

  public setAdminBooking(booking: Booking): void {
    console.log(booking);
    this.booking = booking;
    this.currentBookingExists = false;
    this.isGraduate = false;
    this.isAdminMode = true;
    this.updateSessionStorage();
  }

  public getCompany(): Company {
    if (this.booking != null) {
      return this.booking.company;
    } else {
      return null;
    }
  }

  public updateCompany(company: Company): void {
    this.booking.company = company;
    this.updateSessionStorage();
  }

  public updateGraduate(graduate: Graduate): void {
    this.graduate = graduate;
    this.updateSessionStorage();
  }

  public bookingIsFilled(): void {
    this.bookingFilled.next();
  }

  private updateSessionStorage(): void {
    try {
      sessionStorage.setItem('graduate', JSON.stringify(this.graduate));
      sessionStorage.setItem('booking', JSON.stringify(this.booking));
      sessionStorage.setItem('currentBookingExists', JSON.stringify(this.currentBookingExists));
      sessionStorage.setItem('isAdminMode', JSON.stringify(this.isAdminMode));
      sessionStorage.setItem('isGraduate', JSON.stringify(this.isGraduate));
    } catch (e) {
      console.error('An Error occurred! There might be a problem when refreshing the page.');
      console.error(e.message);
    }
  }
}
