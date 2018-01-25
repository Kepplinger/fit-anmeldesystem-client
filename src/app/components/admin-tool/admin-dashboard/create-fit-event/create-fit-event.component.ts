import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Event } from '../../../../core/model/event';
import { Area } from '../../../../core/model/area';
import { AreaDAO } from '../../../../core/dao/area.dao';

@Component({
  selector: 'fit-create-fit-event',
  templateUrl: './create-fit-event.component.html',
  styleUrls: ['./create-fit-event.component.scss']
})
export class CreateFitEventComponent implements OnInit {

  public event: Event = new Event();
  public areas: Area[] = [];

  public constructor(private changeDetector: ChangeDetectorRef,
                     private areaDAO: AreaDAO) {
  }

  public ngOnInit(): void {
    this.areas = this.areaDAO.fetchAreasFromEvent(1);
  }

  public getRegistrationTimeSpan(): number {
    if (this.event.registrationStart != null && this.event.registrationEnd != null
      && this.event.registrationStart.isBefore(this.event.registrationEnd)) {
      return this.event.registrationEnd.diff(this.event.registrationStart, 'days');
    } else {
      return 0;
    }
  }

  public onDateChange(): void {
    this.changeDetector.detectChanges();
  }
}
