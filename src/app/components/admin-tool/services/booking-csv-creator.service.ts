import { Injectable } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';
import { Booking } from '../../../core/model/booking';
import * as FileSaver from 'file-saver';

@Injectable()
export class BookingCsvCreatorService {

  public bookings: Booking[] = [];

  public constructor(private papa: PapaParseService) {
    let sessionBookings = JSON.parse(sessionStorage.getItem('csvBookings'));

    if (sessionBookings != null) {
      this.bookings = sessionBookings;
    }
  }

  public setBookings(bookings: Booking[]): void {
    this.bookings = bookings;

    if (this.bookings != null) {
      sessionStorage.setItem('csvBookings', JSON.stringify(this.bookings));
    }
  }

  public getBookingCount(): number {
    if (this.bookings != null) {
      return this.bookings.length;
    } else {
      return 0;
    }
  }

  public downloadCsvFromBookings(csvFilter: any): void {

    let csvData: any[][] = [
      this.getCsvHeaders(csvFilter)
    ];

    for (let booking of this.bookings) {

      let data: any[] = [ booking.id ];

      if (csvFilter.isCompanyEnabled) {
        this.addColumn(csvFilter.company.name, booking.company.name, data);
        this.addColumn(csvFilter.company.street, booking.company.address.street, data);
        this.addColumn(csvFilter.company.houseNumber, booking.company.address.streetNumber, data);
        this.addColumn(csvFilter.company.zipCode, booking.company.address.zipCode, data);
        this.addColumn(csvFilter.company.location, booking.company.address.city, data);
        this.addColumn(csvFilter.company.addition, booking.company.address.addition, data);
      }

      if (csvFilter.isContactEnabled) {
        this.addColumn(csvFilter.contact.gender, booking.company.contact.gender, data);
        this.addColumn(csvFilter.contact.name, booking.company.contact.firstName + '' + booking.company.contact.lastName, data);
        this.addColumn(csvFilter.contact.email, booking.company.contact.email, data);
        this.addColumn(csvFilter.contact.phone, booking.company.contact.phoneNumber, data);
      }

      if (csvFilter.isBookingEnabled) {
        this.addColumn(csvFilter.booking.branch, booking.branch, data);
        this.addColumn(csvFilter.booking.phone, booking.phoneNumber, data);
        this.addColumn(csvFilter.booking.email, booking.email, data);
        this.addColumn(csvFilter.booking.homepage, booking.homepage, data);
        this.addColumn(csvFilter.booking.establishments, booking.establishmentsCountAut, data);
        this.addColumn(csvFilter.booking.establishments, booking.establishmentsAut, data);
        this.addColumn(csvFilter.booking.establishments, booking.establishmentsCountInt, data);
        this.addColumn(csvFilter.booking.establishments, booking.establishmentsInt, data);
      }

      csvData.push(data);
    }

    let file = new Blob(
      [this.papa.unparse(csvData, {delimiter: ';', header: true})],
      {type: 'text/plain;charset=utf-8'}
    );
    FileSaver.saveAs(file, 'booking-export.csv');
  }

  private addColumn(condition: boolean, column: any, list: any[]): void {
    if (condition) {
      list.push(column);
    }
  }

  private getCsvHeaders(csvFilter: any): any[] {

    let data: any[] = ['ID'];

    if (csvFilter.isCompanyEnabled) {
      this.addColumn(csvFilter.company.name, 'Firmenname', data);
      this.addColumn(csvFilter.company.street, 'Straße', data);
      this.addColumn(csvFilter.company.houseNumber, 'Hausnummer', data);
      this.addColumn(csvFilter.company.zipCode, 'Postleitzahl', data);
      this.addColumn(csvFilter.company.location, 'Ort', data);
      this.addColumn(csvFilter.company.addition, 'Adresszusatz', data);
    }

    if (csvFilter.isContactEnabled) {
      this.addColumn(csvFilter.contact.gender, 'Anrede', data);
      this.addColumn(csvFilter.contact.name, 'Kontak-Name', data);
      this.addColumn(csvFilter.contact.email, 'Kontakt-Email', data);
      this.addColumn(csvFilter.contact.phone, 'Kontakt-Telefon', data);
    }

    if (csvFilter.isBookingEnabled) {
      this.addColumn(csvFilter.booking.branch, 'Branche', data);
      this.addColumn(csvFilter.booking.phone, 'Telefon', data);
      this.addColumn(csvFilter.booking.email, 'E-Mail', data);
      this.addColumn(csvFilter.booking.homepage, 'Homepage', data);
      this.addColumn(csvFilter.booking.establishments, 'Anzahl Österreich', data);
      this.addColumn(csvFilter.booking.establishments, 'Österreich', data);
      this.addColumn(csvFilter.booking.establishments, 'Anzahl International', data);
      this.addColumn(csvFilter.booking.establishments, 'International', data);
    }

    return data;
  }
}
