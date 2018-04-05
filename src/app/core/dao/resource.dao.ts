import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config/app-config.service';
import { HttpClient } from '@angular/common/http';
import { ResourceBooking } from '../model/resource-booking';

@Injectable()
export class ResourceDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async fetchResources(): Promise<ResourceBooking[]> {

    // return [
    //   new Resource('WLAN', '', 1),
    //   new Resource('Strom', '', 2),
    //   new Resource('Tische', '', 3),
    //   new Resource('Sessel', '', 4)
    // ];

    return this.http.get<ResourceBooking[]>(this.appConfig.serverURL + '/resource')
      .toPromise();
  }
}
