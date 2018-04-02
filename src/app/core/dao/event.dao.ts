import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config/app-config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Event } from '../model/event';
import { EventMapper } from '../model/mapper/event-mapper';
import { ErrorInterceptor } from './helper/error-interceptor';

@Injectable()
export class EventDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async fetchEvents(): Promise<Event[]> {
    return this.http.get<any[]>(this.appConfig.serverURL + '/event')
      .map((data: any[]) => {
        return EventMapper.mapJsonToEventList(data);
      })
      .toPromise();
  }

  public async persistEvent(event: Event): Promise<Event | HttpErrorResponse> {
    return this.http.post<Event>(this.appConfig.serverURL + '/event', event)
      .map((data: any) => {
        return EventMapper.mapJsonToEvent(data);
      })
      .catch(ErrorInterceptor.catchErrorMessage)
      .toPromise();
  }

  public async getCurrentEvent(): Promise<Event> {
    return this.http.get<Event>(this.appConfig.serverURL + '/event/current')
      .map((data: any) => {
        return EventMapper.mapJsonToEvent(data);
      })
      .toPromise();
  }
}
