import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event } from '../../../../core/model/event';
import { Subscription } from 'rxjs';
import { EventService } from '../../../../core/app-services/event.service';
import { Router } from '@angular/router';
import { EventHelper } from '../../../../core/model/helper/event-helper';
import { BaseSubscriptionComponent } from '../../../../core/base-components/base-subscription.component';

@Component({
  selector: 'fit-create-fit-event',
  templateUrl: './create-fit-event.component.html',
  styleUrls: ['./create-fit-event.component.scss']
})
export class CreateFitEventComponent extends BaseSubscriptionComponent implements OnInit, OnDestroy {

  public events: Event[];
  public isLoading: boolean = false;

  public constructor(private eventService: EventService,
                     private router: Router) {
    super();
  }

  public ngOnInit(): void {
    this.events = this.eventService.events.getValue().sort((a: Event, b: Event) => b.eventDate.diff(a.eventDate));

    this.isLoading = this.eventService.isLoading.getValue();
    this.addSub(this.eventService.isLoading.subscribe(l => this.isLoading = l));

    this.addSub(this.eventService.events.subscribe(
      (events: Event[]) => {
        this.events = events.sort((a: Event, b: Event) => b.eventDate.diff(a.eventDate));
      }
    ));
  }

  public createNewFitEvent(): void {
    this.eventService.eventToEdit = new Event();
    this.router.navigate(['/admin-tool', 'fit-bearbeiten']);
  }

  public createNewFitEventWithTemplate(event: Event): void {
    this.eventService.eventToEdit = EventHelper.cloneWithoutIds(event);
    this.router.navigate(['/admin-tool', 'fit-bearbeiten']);
  }
}
