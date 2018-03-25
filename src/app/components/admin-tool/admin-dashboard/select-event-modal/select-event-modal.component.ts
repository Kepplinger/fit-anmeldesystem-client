import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { EventService } from '../../../../core/app-services/event.service';
import { Event } from '../../../../core/model/event';
import { EventHelper } from '../../../../core/model/helper/event-helper';

@Component({
  selector: 'fit-select-event-modal',
  templateUrl: './select-event-modal.component.html',
  styleUrls: ['./select-event-modal.component.scss']
})
export class SelectEventModalComponent implements OnInit, OnDestroy {

  public events: Event[];
  public selectedEvent: Event;

  private subscriptions: Subscription[] = [];

  public constructor(private eventService: EventService,
                     private router: Router) {
  }

  public ngOnInit(): void {
    this.events = this.eventService.events.getValue().sort((a: Event, b: Event) => b.eventDate.diff(a.eventDate));
    this.selectedEvent = this.eventService.selectedEvent.getValue();

    this.subscriptions.push(
      this.eventService.events.subscribe(
        (events: Event[]) => {
          this.events = events.sort((a: Event, b: Event) => b.eventDate.diff(a.eventDate));
        }
      )
    );

    this.subscriptions.push(
      this.eventService.selectedEvent.subscribe(
        (selectedEvent: Event) => {
          this.selectedEvent = selectedEvent;
        }
      )
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public createNewFitEvent(): void {
    this.eventService.selectedEvent.next(new Event());
    this.router.navigate(['/admin-tool', 'fit-anlegen']);
  }

  public createNewFitEventWithTemplate(): void {
    this.eventService.selectedEvent.next(EventHelper.clone(this.selectedEvent));
    this.router.navigate(['/admin-tool', 'fit-anlegen']);
  }

  public selectEvent(event: Event): void {
    this.selectedEvent = event;
  }

  public submitSelection(): void {
    this.eventService.selectedEvent.next(this.selectedEvent);
  }
}
