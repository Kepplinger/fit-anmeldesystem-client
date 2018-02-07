import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Event } from '../model/event';

@Injectable()
export class EventDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async fetchEvents(): Promise<Event[]> {
    return this.http.get<Event[]>(this.appConfig.serverURL + '/event')
      .toPromise();
  }

  public async persistEvent(event: Event): Promise<Event> {
    return this.http.post<Event>(this.appConfig.serverURL + '/event', event)
      .toPromise();
  }
}
