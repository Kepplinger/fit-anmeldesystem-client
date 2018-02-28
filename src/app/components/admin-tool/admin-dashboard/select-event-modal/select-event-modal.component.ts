import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../core/app-services/event.service';
import { Event } from '../../../../core/model/event';
import { Router } from '@angular/router';

@Component({
  selector: 'fit-select-event-modal',
  templateUrl: './select-event-modal.component.html',
  styleUrls: ['./select-event-modal.component.scss']
})
export class SelectEventModalComponent implements OnInit {

  public events: Event[];
  public selectedEvent: Event;

  public constructor(private eventService: EventService,
                     private router: Router) {
  }

  public ngOnInit(): void {
    this.events = this.eventService.events;
    this.selectedEvent = this.eventService.selectedEvent.getValue();
  }

  public createNewFitEvent(): void {
    this.eventService.selectedEvent.next(new Event());
    this.router.navigate(['/admin-tool', 'fit-anlegen']);
  }

  public selectEvent(event: Event): void {
    this.selectedEvent = event;
    this.eventService.selectedEvent.next(event);
  }
}
