import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config/app-config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Event } from '../model/event';
import { EventMapper } from '../model/mapper/event-mapper';
import { ErrorInterceptor } from './helper/error-interceptor';
import { catchError, map } from 'rxjs/operators';
import { Moment } from 'moment';
import * as moment from 'moment';
import { RegistrationState } from '../model/registration-state';

@Injectable()
export class EventDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async fetchEvents(): Promise<Event[]> {
    // return this.http.get<any[]>(this.appConfig.serverURL + '/event')
    //   .pipe(
    //     map((data: any[]) => {
    //       return EventMapper.mapJsonToEventList(data);
    //     }))
    //   .toPromise();

    return [
      new Event(moment(), moment(), moment(), [], null, 1),
      new Event(moment(), moment(), moment(), [], null, 2),
      new Event(moment(), moment(), moment(), [], null, 3),
      new Event(moment(), moment(), moment(), [], null, 4),
      new Event(moment(), moment(), moment(), [], null, 5),
      new Event(moment(), moment(), moment(), [], null, 6)
    ];
  }

  public async persistEvent(event: Event): Promise<any | HttpErrorResponse> {
    return this.http.post<Event>(this.appConfig.serverURL + '/event', EventMapper.mapEventToJson(event))
      .pipe(
        map((data: any) => {
          return {
            event: EventMapper.mapJsonToEvent(data.changedEvent),
            events: EventMapper.mapJsonToEventList(data.events)
          };
        }),
        catchError(ErrorInterceptor.catchErrorMessage))
      .toPromise();
  }

  public async getCurrentEvent(): Promise<Event> {
    // return this.http.get<Event>(this.appConfig.serverURL + '/event/current')
    //   .pipe(
    //     map((data: any) => {
    //         return EventMapper.mapJsonToEvent(data);
    //       },
    //       catchError(() => {
    //         return null;
    //       })))
    //   .toPromise();
    return new Event(moment(), moment(), moment(), [], null, 2);
  }
}
