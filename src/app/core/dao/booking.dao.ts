import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { AppConfig } from '../app-config/app-config.service';
import { Booking } from '../model/booking';
import { Event } from '../model/event';
import { BookingMapper } from '../model/mapper/booking-mapper';
import { map, retry } from 'rxjs/operators';
import { IsAccepted } from '../model/enums/is-accepted';

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

  public async persistBooking(booking: Booking, isAdminChange: boolean = false): Promise<Booking> {
    let json: any = BookingMapper.mapBookingToJson(booking);
    let params = new HttpParams().set('isAdminChange', String(isAdminChange));

    return await this.http.post<any>(this.appConfig.serverURL + '/booking', json, {params: params})
      .pipe(
        map((data: any) => {
          return BookingMapper.mapJsonToBooking(data);
        }))
      .toPromise();
  }

  public async acceptBooking(booking: Booking, status: IsAccepted): Promise<Booking> {
    return this.http.put<Booking>(this.appConfig.serverURL + '/booking/accept/' + booking.id, status)
      .toPromise();
  }
}
