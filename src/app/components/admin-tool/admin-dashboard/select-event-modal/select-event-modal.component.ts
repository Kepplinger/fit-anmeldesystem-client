import { Component } from '@angular/core';
import { EventService } from '../../../../core/app-services/event.service';
import { Event } from '../../../../core/model/event';
import { Router } from '@angular/router';

@Component({
  selector: 'fit-select-event-modal',
  templateUrl: './select-event-modal.component.html',
  styleUrls: ['./select-event-modal.component.scss']
})
export class SelectEventModalComponent {

  public events: Event[];

  public constructor(private eventService: EventService,
                     private router: Router) {
    this.events = this.eventService.events;
  }

  public createNewFitEvent(): void {
    this.eventService.selectedEvent.next(new Event());
    this.router.navigate(['/admin-tool', 'fit-anlegen']);
  }
}
