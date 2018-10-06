import { Booking } from '../booking';
import * as moment from 'moment';
import { CompanyMapper } from './company-mapper';
import { Contact } from '../contact';
import { ArrayUtils } from '../../utils/array-utils';
import { Resource } from '../resource';
import { Branch } from '../branch';
import { PresentationMapper } from './presentation-mapper';

export class BookingMapper {

  public static mapJsonToBooking(bookingJson: any): Booking {

    if (bookingJson != null) {
      let booking = new Booking();

      booking.id = bookingJson.id;
      booking.timestamp = bookingJson.timestamp;
      booking.company = CompanyMapper.mapJsonToCompany(bookingJson.company);
      booking.presentation = PresentationMapper.mapJsonToPresentation(bookingJson.presentation);
      booking.remarks = bookingJson.remarks;
      booking.event = bookingJson.event;
      booking.location = bookingJson.location;
      booking.contact = bookingJson.contact;
      booking.fitPackage = bookingJson.fitPackage;

      booking.resources = bookingJson.resources.map(r => {
        if (r.resource != null) {
          return r.resource;
        } else {
          return r;
        }
      });

      booking.additionalInfo = bookingJson.additionalInfo;
      booking.representatives = bookingJson.representatives;
      booking.providesThesis = bookingJson.providesThesis;
      booking.providesSummerJob = bookingJson.providesSummerJob;

      booking.branches = bookingJson.branches.map(b => {
        if (b.branch != null) {
          return b.branch;
        } else {
          return b;
        }
      });

      booking.companyDescription = bookingJson.companyDescription;
      booking.isAccepted = bookingJson.isAccepted;
      booking.creationDate = moment(bookingJson.creationDate);
      booking.branch = bookingJson.branch;
      booking.logo = bookingJson.logo;
      booking.homepage = bookingJson.homepage;
      booking.email = bookingJson.email;
      booking.phoneNumber = bookingJson.phoneNumber;

      // noinspection SuspiciousInstanceOfGuard
      if (!(bookingJson.establishmentsAut instanceof Array)) {
        booking.establishmentsAut = bookingJson.establishmentsAut.split(';').filter(e => e !== '');
      } else {
        booking.establishmentsAut = bookingJson.establishmentsAut;
      }

      // noinspection SuspiciousInstanceOfGuard
      if (!(bookingJson.establishmentsInt instanceof Array)) {
        booking.establishmentsInt = bookingJson.establishmentsInt.split(';').filter(e => e !== '');
      } else {
        booking.establishmentsInt = bookingJson.establishmentsInt;
      }

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

  public static mapBookingIntoFreshOne(booking: Booking) {
    booking = BookingMapper.mapJsonToBooking(booking);

    delete booking.timestamp;

    if (booking.logo != null) {
      delete booking.logo.id;
      delete booking.logo.timestamp;
    }

    if (booking.presentation != null) {
      delete booking.presentation.id;
      delete booking.presentation.timestamp;

      if (booking.presentation.file != null) {
        delete booking.presentation.file.id;
        delete booking.presentation.file.timestamp;
      }
    }

    for (let representative of booking.representatives) {
      if (representative != null) {
        delete representative.id;
        delete representative.timestamp;

        if (representative.image != null) {
          delete representative.image.id;
          delete representative.image.timestamp;
        }
      }
    }

    return booking;
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

  public static mapBookingToJson(booking: Booking): any {

    let json: any = booking;

    if (json != null && json.establishmentsAut != null && json.establishmentsInt != null) {
      json.establishmentsAut = ArrayUtils.concatWithDelimiter(json.establishmentsAut, ';');
      json.establishmentsInt = ArrayUtils.concatWithDelimiter(json.establishmentsInt, ';');
    }

    json.presentation = PresentationMapper.mapPresentationToJson(booking.presentation);

    json.resources = booking.resources.map(
      (resource: Resource) => {
        return {
          fk_Booking: booking.id,
          fk_Resource: resource.id
        };
      }
    );

    json.branches = booking.branches.map(
      (branch: Branch) => {
        return {
          fk_Booking: booking.id,
          fk_Branch: branch.id
        };
      }
    );

    // workaround to remove null fields in json
    for (let representative of json.representatives) {
      if (representative.id == null) {
        delete representative.id;
      }
    }

    json.fk_Company = booking.company.id;
    json.fk_Event = booking.event.id;
    json.fk_FitPackage = booking.fitPackage.id;

    if (booking.location != null) {
      json.fk_Location = booking.location.id;
    }

    // delete unnecessary company attribute (because of foreign keys)
    delete json.company;
    delete json.event;
    delete json.fitPackage;
    delete json.location;

    return json;
  }
}
