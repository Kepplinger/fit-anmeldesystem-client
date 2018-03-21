import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app-config/app-config.service';
import { Booking } from '../model/booking';
import 'rxjs/add/operator/toPromise';
import { BookingMapper } from '../model/mapper/booking-mapper';

@Injectable()
export class BookingDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public fetchAllBookings(): Promise<Booking[]> {
    return this.http.get<Booking[]>(this.appConfig.serverURL + '/booking')
      .map((data: any[]) => {
        return BookingMapper.mapJsonToBookingList(data);
      })
      .toPromise();
  }

  public async createBooking(booking: Booking): Promise<void> {

    let json: any = booking;

    json.company.folderInfo.establishmentsAut = this.concatWithDelimiter(json.company.folderInfo.establishmentsAut, ';');
    json.company.folderInfo.establishmentsInt = this.concatWithDelimiter(json.company.folderInfo.establishmentsInt, ';');

    await this.http.post<void>(this.appConfig.serverURL + '/booking', booking)
      .toPromise();
  }

  private concatWithDelimiter(stringArray: string[], delimiter: string) {
    return stringArray.map(e => e.replace(delimiter, '\\' + delimiter)).join(delimiter);
  }
}
