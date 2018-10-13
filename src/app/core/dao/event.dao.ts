import { Injectable } from '@angular/core';
import { AppConfig } from '../app-config/app-config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from '../model/event';
import { EventMapper } from '../model/mapper/event-mapper';
import { ErrorInterceptor } from './helper/error-interceptor';
import { catchError, map } from 'rxjs/operators';
import { FitHttpError } from '../app-helper/helper-model/fit-http-error';

@Injectable()
export class EventDAO {

  public constructor(private appConfig: AppConfig,
                     private http: HttpClient) {
  }

  public async fetchEvents(): Promise<Event[]> {
    return this.http.get<any[]>(this.appConfig.serverURL + '/event')
      .pipe(
        map((data: any[]) => {
          return EventMapper.mapJsonToEventList(data);
        }))
      .toPromise();
  }

  public async updatePresentationLock(event: Event, presentationLock: boolean): Promise<Event | FitHttpError> {
    let headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    return this.http.post<Event>(this.appConfig.serverURL + '/event/presentationLock/' + event.id, presentationLock, {headers: headers})
      .pipe(
        map((data: any) => EventMapper.mapJsonToEvent(data)),
        catchError(ErrorInterceptor.catchErrorMessage))
      .toPromise();
  }

  public async persistEvent(event: Event): Promise<any | FitHttpError> {
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
    return this.http.get<Event>(this.appConfig.serverURL + '/event/current')
      .pipe(
        map((data: any) => {
            return EventMapper.mapJsonToEvent(data);
          },
          catchError(() => {
            return null;
          })))
      .toPromise();
  }

  public async getEvent(event: Event): Promise<Event> {
    return this.http.get<Event>(this.appConfig.serverURL + '/event/' + event.id)
      .pipe(
        map((data: any) => {
          return EventMapper.mapJsonToEvent(data);
        }))
      .toPromise();
  }
}
