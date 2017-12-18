import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Resource } from '../model/resource';

@Injectable()
export class ResourceDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async getResources(): Promise<Resource[]> {

    // return [
    //   new Resource('WLAN', '', 1),
    //   new Resource('Strom', '', 2),
    //   new Resource('Tische', '', 3),
    //   new Resource('Sessel', '', 4)
    // ];

    return this.http.get<Resource[]>(this.appConfig.serverURL + '/resource')
      .toPromise();
  }
}
