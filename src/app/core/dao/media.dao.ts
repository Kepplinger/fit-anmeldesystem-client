import { AppConfig } from '../app-config/app-config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../model/event';

@Injectable()
export class MediaDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async downloadImages(event: Event): Promise<any> {

    let headers: HttpHeaders = new HttpHeaders()
      .append('Accept', 'application/zip');

    return this.http.get(this.appConfig.serverURL + '/media/event/' + event.id, {headers: headers, responseType: 'blob'})
      .toPromise();
  }
}
