import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppConfig } from '../app-config/app-config.service';
import { Booking } from '../model/booking';
import { Event } from '../model/event';
import { BookingMapper } from '../model/mapper/booking-mapper';
import { map } from 'rxjs/operators';

@Injectable()
export class BookingDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public fetchAllBookings(): Promise<Booking[]> {
    return this.http.get<Booking[]>(this.appConfig.serverURL + '/booking')
      .pipe(
        map((data: any[]) => {
          return BookingMapper.mapJsonToBookingList(data);
        }))
      .toPromise();
  }

  public fetchAllBookingsForEvent(event: Event): Promise<Booking[]> {
    return this.http.get<Booking[]>(this.appConfig.serverURL + '/booking/event/' + event.id)
      .pipe(
        map((data: any[]) => {
          return BookingMapper.mapJsonToBookingList(data);
        }))
      .toPromise();
  }

  public async persistBooking(booking: Booking): Promise<void> {
    let json: any = BookingMapper.mapBookingToJson(booking);

    await this.http.post<void>(this.appConfig.serverURL + '/booking', json)
      .toPromise();
  }
}
