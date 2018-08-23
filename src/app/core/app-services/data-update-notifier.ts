import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Company } from '../model/company';
import { Graduate } from '../model/graduate';
import { Booking } from '../model/booking';

@Injectable()
export class DataUpdateNotifier {

  public companyUpdated: Subject<Company> = new Subject();
  public companyAdded: Subject<Company> = new Subject();
  public graduateUpdated: Subject<Graduate> = new Subject();
  public bookingUpdated: Subject<Booking> = new Subject();
  public bookingAdded: Subject<Booking> = new Subject();

  public updateCompany(company: Company): void {
    this.companyUpdated.next(company);
  }

  public addCompany(company: Company): void {
    this.companyAdded.next(company);
  }

  public updateBooking(booking: Booking): void {
    this.bookingUpdated.next(booking);
  }

  public addBooking(booking: Booking): void {
    this.bookingAdded.next(booking);
  }

  public updateGraduate(graduate: Graduate): void {
    this.graduateUpdated.next(graduate);
  }
}
