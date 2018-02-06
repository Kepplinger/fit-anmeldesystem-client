import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Event } from '../../../../core/model/event';
import { Area } from '../../../../core/model/area';
import { AreaDAO } from '../../../../core/dao/area.dao';
import { LocationDao } from '../../../../core/dao/location.dao';
import { Location } from '../../../../core/model/location';

declare let $: any;

@Component({
  selector: 'fit-create-fit-event',
  templateUrl: './create-fit-event.component.html',
  styleUrls: ['./create-fit-event.component.scss']
})
export class CreateFitEventComponent implements OnInit {

  public event: Event = new Event();
  public areas: Area[] = [];
  public selectedArea: Area = null;

  public isModalShown: boolean = false;

  public constructor(private changeDetector: ChangeDetectorRef,
                     private areaDAO: AreaDAO,
                     private locationDAO: LocationDao) {
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

  public selectArea(area: Area): void {
    this.isModalShown = true;
    console.log(this.isModalShown);
    setTimeout(() => {
      $('#editAreaModal').modal('show');
    }, 0);
    this.selectedArea = area;
  }

  public onDateChange(): void {
    this.changeDetector.detectChanges();
  }

  public updateArea(area: Area): void {
    this.selectedArea = area;
    this.areaDAO.updateArea(area);

    area.locations.forEach((location: Location) => {
      if (location.id == null) {
        this.locationDAO.createLocation(location)
      } else {
        this.locationDAO.updateLocation(location)
      }
    })
  }
}
