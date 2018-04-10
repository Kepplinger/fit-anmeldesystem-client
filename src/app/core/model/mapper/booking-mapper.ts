import { Booking } from '../booking';
import * as moment from 'moment';
import { CompanyMapper } from './company-mapper';
import { Contact } from '../contact';

export class BookingMapper {

  public static mapJsonToBooking(bookingJson: any): Booking {

    if (bookingJson != null) {
      let booking = new Booking();

      booking.id = bookingJson.id;
      booking.timestamp = bookingJson.timestamp;
      booking.company = CompanyMapper.mapJsonToCompany(bookingJson.company);
      booking.presentation = bookingJson.presentation;
      booking.remarks = bookingJson.remarks;
      booking.event = bookingJson.event;
      booking.location = bookingJson.location;
      booking.contact = bookingJson.contact;
      booking.fitPackage = bookingJson.fitPackage;
      booking.resources = bookingJson.resources;
      booking.additionalInfo = bookingJson.additionalInfo;
      booking.representatives = bookingJson.representatives;
      booking.providesThesis = bookingJson.providesThesis;
      booking.providesSummerJob = bookingJson.providesSummerJob;
      booking.branches = bookingJson.branches;
      booking.companyDescription = bookingJson.companyDescription;
      booking.isAccepted = bookingJson.isAccepted;
      booking.creationDate = moment(bookingJson.creationDate);
      booking.branch = bookingJson.branch;
      booking.logo = bookingJson.logo;
      booking.homepage = bookingJson.homepage;
      booking.email = bookingJson.email;
      booking.phoneNumber = bookingJson.phoneNumber;
      booking.establishmentsAut = bookingJson.establishmentsAut.split(';').filter(e => e !== '');
      booking.establishmentsInt = bookingJson.establishmentsInt.split(';').filter(e => e !== '');
      booking.establishmentsCountAut = bookingJson.establishmentsCountAut;
      booking.establishmentsCountInt = bookingJson.establishmentsCountInt;

      if (booking.contact == null) {
        booking.contact = new Contact();
      }

      return booking;
    } else {
      return null;
    }
  }

  public static mapJsonToBookingList(bookingJson: any[]): Booking[] {

    if (bookingJson != null) {
      let bookings: Booking[] = [];

      bookingJson.forEach(
        (data: any) => {
          bookings.push(BookingMapper.mapJsonToBooking(data));
        }
      );

      return bookings;
    } else {
      return null;
    }
  }

}
