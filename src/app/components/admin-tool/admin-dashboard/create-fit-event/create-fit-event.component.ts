import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Event } from '../../../../core/model/event';
import { Area } from '../../../../core/model/area';
import { EventDAO } from '../../../../core/dao/event.dao';
import { ToastrService } from 'ngx-toastr';
import { Location } from '../../../../core/model/location';
import { ArrayUtils } from '../../../../core/utils/array-utils';

declare let $: any;

@Component({
  selector: 'fit-create-fit-event',
  templateUrl: './create-fit-event.component.html',
  styleUrls: ['./create-fit-event.component.scss']
})
export class CreateFitEventComponent implements OnInit {

  public event: Event = new Event();
  public selectedArea: Area = null;

  public isLoading: boolean = false;
  public isModalShown: boolean = false;

  public constructor(private changeDetector: ChangeDetectorRef,
                     private toastr: ToastrService,
                     private eventDAO: EventDAO) {
  }

  public ngOnInit(): void {
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
    setTimeout(() => {
      $('#editAreaModal').modal('show');
    }, 0);
    this.selectedArea = area;
  }

  public onDateChange(): void {
    this.changeDetector.detectChanges();
  }

  public updateArea(area: Area): void {
    let index = this.event.areas.indexOf(this.selectedArea);
    this.event.areas[index] = area;

    this.selectedArea = area;
  }

  public addNewArea(): void {
    this.event.areas.push(new Area('----'));
  }

  public removeArea(area: Area): void {
    ArrayUtils.deleteElement(this.event.areas, area);
    if (this.selectedArea === area) {
      this.selectedArea = null;
    }
  }

  public async persistEvent(): Promise<void> {
    this.isLoading = true;
    console.log(await this.eventDAO.persistEvent(this.event));
    this.isLoading = false;
    this.toastr.info('Request finished', 'Event speichern!');
  }
}
