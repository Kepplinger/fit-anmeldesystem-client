import { Injectable } from '@angular/core';
import { EventDAO } from '../dao/event.dao';
import { Event } from '../model/event';
import { BehaviorSubject } from 'rxjs';
import { EventMapper } from '../model/mapper/event-mapper';
import { AppLoadingService } from './app-loading.service';

@Injectable()
export class EventService {

  public currentEvent: BehaviorSubject<Event> = new BehaviorSubject<Event>(new Event());
  public selectedEvent: BehaviorSubject<Event> = new BehaviorSubject<Event>(new Event());
  public events: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);

  public constructor(private eventDAO: EventDAO,
                     private appLoadingService: AppLoadingService) {
    this.fetchEvents();
    this.selectedEvent.subscribe(
      (event: Event) => {
        sessionStorage.setItem('selectedEvent', JSON.stringify(event));
      }
    );
  }

  public async updateEvents(): Promise<void> {
    this.events.next(await this.eventDAO.fetchEvents());
  }

  private async fetchEvents(): Promise<void> {
    this.appLoadingService.startLoading();
    if (this.fetchSelectedEventFromSessionStorage()) {
      let event = await this.eventDAO.getCurrentEvent();

      if (event != null) {
        this.currentEvent.next(event);
      } else {
        this.currentEvent.next(new Event());
      }
    } else {
      let event = await this.eventDAO.getCurrentEvent();
      this.currentEvent.next(event);
      this.selectedEvent.next(event);
    }
    this.appLoadingService.endLoading();

    this.events.next(await this.eventDAO.fetchEvents());
  }

  private fetchSelectedEventFromSessionStorage(): boolean {
    let event = EventMapper.mapJsonToEvent(JSON.parse(sessionStorage.getItem('selectedEvent')));
    if (event != null) {
      this.selectedEvent.next(event);
      return true;
    } else {
      return false;
    }
  }
}
