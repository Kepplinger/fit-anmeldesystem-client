import { Component } from '@angular/core';
import { EventService } from '../../../core/app-services/event.service';
import { Event } from '../../../core/model/event';

@Component({
  selector: 'fit-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {

  public event: Event;

  public constructor(private eventService: EventService) {
    this.event = eventService.selectedEvent.getValue();
  }
}
