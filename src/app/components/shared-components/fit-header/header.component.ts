import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../core/app-services/event.service';
import { Event } from '../../../core/model/event';

@Component({
  selector: 'fit-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class FitHeaderComponent implements OnInit {

  public event: Event;

  public constructor(private eventService: EventService) {
  }

  public ngOnInit(): void {
    this.event = this.eventService.currentEvent.getValue();

    this.eventService.currentEvent.subscribe(
      (event: Event) => {
        this.event = event;
      }
    )
  }

}
