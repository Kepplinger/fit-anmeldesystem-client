import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../core/app-services/event.service';
import { Event } from '../../../../core/model/event';
import { BaseSubscriptionComponent } from '../../../../core/base-components/base-subscription.component';

@Component({
  selector: 'fit-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class FitHeaderComponent extends BaseSubscriptionComponent implements OnInit {

  public event: Event;

  public constructor(private eventService: EventService) {
    super();
  }

  public ngOnInit(): void {
    this.event = this.eventService.currentEvent.getValue();

    this.addSub(this.eventService.currentEvent.subscribe(
      (event: Event) => {
        this.event = event;
      }
    ));
  }
}
