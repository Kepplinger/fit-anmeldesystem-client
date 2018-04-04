import { Injectable } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';
import { Booking } from '../../../core/model/booking';
import * as FileSaver from 'file-saver';

@Injectable()
export class CsvCreatorService {

  public bookings: Booking[] = [];

  public constructor(private papa: PapaParseService) {
    let sessionBookings = JSON.parse(sessionStorage.getItem('csvBookings'));

    if (sessionBookings != null) {
      this.bookings = sessionBookings;
    }
  }

  public setBookings(bookings: Booking[]): void {
    this.bookings = bookings;
    sessionStorage.setItem('csvBookings', JSON.stringify(this.bookings));
  }

  public getBookingCount(): number {
    return this.bookings.length;
  }

  public downloadCsvFromBookings(): void {

    let bookingData: any[][] = [
      [
        'ID',
        'Datum',
        'Firmen-Beschreibung',
        'Fachrichtungen',
        'vergibt Ferialpraktikum?',
        'vergibt Diplomarbeit?',
        'Vertreter',
        'Paket',
        'Resourcen',
        'Anmerkungen',
        'Firma',
        'Ist aktzeptiert?'
      ]
    ];

    for (let booking of this.bookings) {
      let data: any[] = [
        booking.id,
        booking.creationDate.format('LLLL'),
        booking.companyDescription,
        booking.branches,
        booking.providesSummerJob,
        booking.providesThesis,
        booking.representatives,
        booking.fitPackage,
        booking.resources,
        booking.remarks,
        booking.company.name,
        booking.isAccepted
      ];
      bookingData.push(data);
    }

    let file = new Blob(
      [this.papa.unparse(bookingData, {delimiter: ';', header: true})],
      {type: 'text/plain;charset=utf-8'}
    );
    FileSaver.saveAs(file, 'booking-export.csv');
  }

}
