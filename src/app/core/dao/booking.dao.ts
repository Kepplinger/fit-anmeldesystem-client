import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { AppConfig } from '../app-config/app-config.service';
import { Booking } from '../model/booking';
import { Event } from '../model/event';
import { BookingMapper } from '../model/mapper/booking-mapper';
import { map } from 'rxjs/operators';
import { IsAccepted } from '../model/enums/is-accepted';
import { UserAuthorizationService } from '../app-services/user-authorization.service';
import { FitUserRole } from '../model/enums/fit-user-role';

@Injectable()
export class BookingDAO {

  public constructor(private appConfig: AppConfig,
                     private adminAuthenticationService: UserAuthorizationService,
                     private http: HttpClient) {
  }

  public fetchAllBookingsForEvent(event: Event): Promise<Booking[]> {
    let role: FitUserRole = this.adminAuthenticationService.getUserRole();

    if (role === FitUserRole.FitAdmin || role === FitUserRole.FitReadOnly) {
      return this.http.get<Booking[]>(this.appConfig.serverURL + '/booking/event/' + event.id)
        .pipe(
          map((data: any[]) => {
            return BookingMapper.mapJsonToBookingList(data);
          }))
        .toPromise();
    }
  }

  public async persistBooking(booking: Booking): Promise<Booking> {
    let json: any = BookingMapper.mapBookingToJson(booking);

    return await this.http.post<any>(this.appConfig.serverURL + '/booking', json)
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
