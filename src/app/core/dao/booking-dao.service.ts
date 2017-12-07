import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app-configs/app-configs.service';
import { Booking } from '../model/booking';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BookingDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async createBooking(booking: Booking): Promise<void> {
    await this.http.post(this.appConfig.serverURL + 'api/booking/create', booking)
      .toPromise();
  }
}
