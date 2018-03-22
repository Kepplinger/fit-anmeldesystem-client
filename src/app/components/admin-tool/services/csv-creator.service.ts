import { Injectable } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';
import { Booking } from '../../../core/model/booking';
import * as FileSaver from 'file-saver';

@Injectable()
export class CsvCreatorService {

  public constructor(private papa: PapaParseService) {
  }

  public downloadCsvFromBookings(bookings: Booking[]): void {

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

    for (let booking of bookings) {
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
