import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from '../../../core/app-services/event.service';
import { Event } from '../../../core/model/event';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'fit-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  public event: Event;

  private subscriptions: Subscription[] = [];

  public constructor(private eventService: EventService) {
  }

  public ngOnInit(): void {
    this.event = this.eventService.currentEvent.getValue();

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

  public openSelectionModal(): void {
    // triggers selectedEvent Subject to fix display bug in modal
    this.eventService.selectedEvent.next(this.eventService.selectedEvent.getValue());
  }
}
