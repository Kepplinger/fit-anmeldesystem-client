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

    this.selectedEvent.subscribe(
      (event: Event) => {
        console.log(event);
        sessionStorage.setItem('selectedEvent', JSON.stringify(event));
      }
    );
  }

  private async fetchEvents(): Promise<void> {
    this.eventDAO.fetchEvents().then(
      (events: Event[]) => {
        this.events.next(events);
      }
    );

    if (this.fetchSelectedEventFromSessionStorage()) {
      console.log('from local');
      console.log(this.selectedEvent.getValue());
      let event = await this.eventDAO.getCurrentEvent();

      if (event != null) {
        this.currentEvent.next(event);
      } else {
        this.currentEvent.next(new Event());
      }
    } else {
      console.log('from server');
      let event = await this.eventDAO.getCurrentEvent();
      this.currentEvent.next(event);
      this.selectedEvent.next(event);
    }
  }

  public async updateEvents(): Promise<void> {
    this.events.next(await this.eventDAO.fetchEvents());
  }

  private fetchSelectedEventFromSessionStorage(): boolean {
    console.log(this.selectedEvent.getValue());
    console.log(JSON.parse(sessionStorage.getItem('selectedEvent')));
    let event = EventMapper.mapJsonToEvent(JSON.parse(sessionStorage.getItem('selectedEvent')));

    if (event != null) {
      this.selectedEvent.next(event);
      return true;
    } else {
      return false;
    }
  }
}
