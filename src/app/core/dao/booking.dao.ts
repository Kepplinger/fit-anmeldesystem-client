import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app-config/app-config.service';
import { Booking } from '../model/booking';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BookingDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async createBooking(booking: Booking): Promise<void> {

    let json: any = booking;

    json.company.establishmentsAut = this.concatWithDelimiter(json.company.establishmentsAut, ';');
    json.company.establishmentsInt = this.concatWithDelimiter(json.company.establishmentsInt, ';');

    await this.http.post(this.appConfig.serverURL + '/booking', booking)
      .toPromise();
  }

  private concatWithDelimiter(stringArray: string[], delimiter: string) {
    return stringArray.map(e => e.replace(delimiter, '\\' + delimiter)).join(delimiter);
  }
}
