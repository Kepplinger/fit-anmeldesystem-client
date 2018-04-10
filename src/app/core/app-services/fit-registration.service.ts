import { Injectable } from '@angular/core';
import { Booking } from '../model/booking';
import { Company } from '../model/company';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FitRegistrationService {

  public booking: Booking;
  public editMode: boolean;

  public bookingFilled: Subject<void> = new Subject<void>();

  public constructor() {
    this.booking = JSON.parse(sessionStorage.getItem('booking'));
    this.editMode = JSON.parse(sessionStorage.getItem('editMode'));
  }

  public setBooking(booking: Booking, editMode: boolean): void {
    this.booking = booking;
    this.editMode = editMode;
    sessionStorage.setItem('booking', JSON.stringify(this.booking));
    sessionStorage.setItem('editMode', JSON.stringify(this.editMode));
  }

  public setCompany(company: Company): void {
    this.booking = new Booking();
    this.booking.company = company;
    this.editMode = false;
    sessionStorage.setItem('booking', JSON.stringify(this.booking));
    sessionStorage.setItem('editMode', JSON.stringify(this.editMode));
  }

  public bookingIsFilled(): void {
    this.bookingFilled.next();
  }
}
