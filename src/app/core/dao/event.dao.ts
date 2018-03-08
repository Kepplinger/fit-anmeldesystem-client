import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config/app-config.service';
import { HttpClient } from '@angular/common/http';
import { Event } from '../model/event';
import { EventHelper } from '../model/helper/event-helper';

@Injectable()
export class EventDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async fetchEvents(): Promise<Event[]> {
    return this.http.get<any[]>(this.appConfig.serverURL + '/event')
      .map((data: any[]) => {
        return EventHelper.parseJsonToEventList(data);
      })
      .toPromise();
  }

  public async persistEvent(event: Event): Promise<Event> {
    return this.http.post<Event>(this.appConfig.serverURL + '/event', event)
      .map((data: any) => {
        return EventHelper.parseJsonToEvent(data);
      })
      .toPromise();
  }

  public async getCurrentEvent(): Promise<Event> {
    return this.http.get<Event>(this.appConfig.serverURL + '/event/latest')
      .map((data: any) => {
        return EventHelper.parseJsonToEvent(data);
      })
      .toPromise();
  }
}
