import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../core/app-services/event.service';
import { Event } from '../../../core/model/event';
import { BaseAdminRoleGuardComponent } from '../../../core/base-components/base-admin-role-guard.component';
import { UserAuthorizationService } from '../../../core/app-services/user-authorization.service';

@Component({
  selector: 'fit-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent extends BaseAdminRoleGuardComponent implements OnInit {

  public event: Event;
  public events: Event[];

  public constructor(private eventService: EventService,
                     protected userAuthorizationService: UserAuthorizationService) {
    super(userAuthorizationService);
  }

  public ngOnInit(): void {
    this.event = this.eventService.currentEvent.getValue();
    this.events = this.eventService.events.getValue().sort((a: Event, b: Event) => b.eventDate.diff(a.eventDate));

    this.addSub(this.eventService.events.subscribe(
      (events: Event[]) => {
        this.events = events.sort((a: Event, b: Event) => b.eventDate.diff(a.eventDate));
      }
    ));

    this.addSub(this.eventService.selectedEvent.subscribe(
      (selectedEvent: Event) => {
        this.event = selectedEvent;
      }
    ));
  }

  public selectEvent(event: Event): void {
    this.event = event;
    this.eventService.selectEvent(this.event);
  }
}
