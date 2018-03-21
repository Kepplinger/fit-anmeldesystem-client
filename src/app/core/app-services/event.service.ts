import { Injectable } from '@angular/core';
import { EventDAO } from '../dao/event.dao';
import { Event } from '../model/event';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EventMapper } from '../model/mapper/event-mapper';

@Injectable()
export class EventService {

  public currentEvent: BehaviorSubject<Event> = new BehaviorSubject<Event>(new Event());
  public selectedEvent: BehaviorSubject<Event> = new BehaviorSubject<Event>(new Event());
  public events: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);

  public constructor(private eventDAO: EventDAO) {
    this.fetchEvents();
  }

  private async fetchEvents(): Promise<void> {
    this.eventDAO.fetchEvents().then(
      (events: Event[]) => {
        this.events.next(events);
      }
    );

    if (!this.fetchEventFromSessionStorage()) {
      let event = await this.eventDAO.getCurrentEvent();
      this.currentEvent.next(event);
      this.selectedEvent.next(event);
      sessionStorage.setItem('event', JSON.stringify(event));
    } else {
      this.currentEvent.next(await this.eventDAO.getCurrentEvent());
    }
  }

  private fetchEventFromSessionStorage(): boolean {
    let event = EventMapper.mapJsonToEvent(JSON.parse(sessionStorage.getItem('event')));

    if (event != null) {
      this.selectedEvent.next(event);
      return true;
    } else {
      return false;
    }
  }
}