import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config/app-config.service';
import { Location } from '../model/location';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocationDao {

  public constructor(private http: HttpClient,
                     private appConfig: AppConfig) {
  }

  public updateLocation(location: Location): Promise<void> {
    return this.http.put<void>(this.appConfig.serverURL + '/location', location)
      .toPromise();
  }

  public createLocation(location: Location): Promise<Location> {
    return this.http.post<Location>(this.appConfig.serverURL + '/location', location)
      .toPromise();
  }
}
