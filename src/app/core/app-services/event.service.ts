import { Injectable } from '@angular/core';
import { EventDAO } from '../dao/event.dao';
import { Event } from '../model/event';
import { BehaviorSubject } from 'rxjs';
import { EventMapper } from '../model/mapper/event-mapper';
import { AppLoadingService } from './app-loading.service';
import { tick } from '@angular/core/testing';
import { childOfKind } from 'tslint';

@Injectable()
export class EventService {

  public currentEvent: BehaviorSubject<Event> = new BehaviorSubject<Event>(null);
  public selectedEvent: BehaviorSubject<Event> = new BehaviorSubject<Event>(null);
  public events: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public eventToEdit: Event = null;

  public constructor(private eventDAO: EventDAO,
                     private appLoadingService: AppLoadingService) {
    this.fetchEvents();

    this.selectedEvent.subscribe(
      (event: Event) => {
        if (event != null && event.id != null) {
          this.eventToEdit = event;
          sessionStorage.setItem('selectedEvent', JSON.stringify(event));
        }
      }
    );
  }

  public async reloadEvents(): Promise<void> {
    if (this.events.getValue().length === 0) {
      this.isLoading.next(true);
    }
    this.events.next(await this.eventDAO.fetchEvents());
    this.isLoading.next(false);
  }

  private async fetchEvents(): Promise<void> {
    this.appLoadingService.startLoading();

    let currentEvent: Event;

    // currentEvent CANNOT be null (app won't run without it)
    do {
      try {
        currentEvent = await this.eventDAO.getCurrentEvent();
      } catch (e) {
        setTimeout(() => console.error('Der Request konnte nicht durchgeführt werden! Erneuter Versuch'),
          300);
      }
    } while (currentEvent == null);

    this.currentEvent.next(currentEvent);

    if (!this.fetchSelectedEventFromSessionStorage() || this.selectedEvent.getValue().id == null) {
      this.selectedEvent.next(currentEvent);
    }

    this.appLoadingService.endLoading();

    this.reloadEvents();
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
