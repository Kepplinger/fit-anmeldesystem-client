import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../../../core/app-services/event.service';
import { Event } from '../../../core/model/event';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fit-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  public event: Event;
  public events: Event[];

  private subscriptions: Subscription[] = [];

  public constructor(private eventService: EventService) {
  }

  public ngOnInit(): void {
    this.event = this.eventService.currentEvent.getValue();
    this.events = this.eventService.events.getValue().sort((a: Event, b: Event) => b.eventDate.diff(a.eventDate));

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
          this.event = selectedEvent;
        }
      )
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public selectEvent(event: Event): void {
    this.event = event;
    this.eventService.selectedEvent.next(this.event);
  }
}
