import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Event } from '../../../../core/model/event';
import { Area } from '../../../../core/model/area';
import { EventDAO } from '../../../../core/dao/event.dao';
import { ArrayUtils } from '../../../../core/utils/array-utils';
import { EventService } from '../../../../core/app-services/event.service';
import { ModalWindowService } from '../../../../core/app-services/modal-window.service';
import { EventHelper } from '../../../../core/model/helper/event-helper';

declare let $: any;

@Component({
  selector: 'fit-edit-fit-event',
  templateUrl: './edit-fit-event.component.html',
  styleUrls: ['./edit-fit-event.component.scss']
})
export class EditFitEventComponent implements OnInit {

  public event: Event = new Event();
  public selectedArea: Area = null;

  public isLoading: boolean = false;
  public isModalShown: boolean = false;

  public constructor(private changeDetector: ChangeDetectorRef,
                     private toastr: ToastrService,
                     private router: Router,
                     private modalWindow: ModalWindowService,
                     private eventService: EventService,
                     private eventDAO: EventDAO) {
  }

  public ngOnInit(): void {
    this.event = EventHelper.clone(this.eventService.eventToEdit);

    if (this.event == null) {
      this.router.navigate(['/admin-tool', 'dash']);
    } else if (this.event.areas == null || this.event.areas.length === 0) {
      this.event.areas.push(new Area());
    }
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
    this.event.areas.push(new Area());
  }

  public removeArea(area: Area): void {

    if (area.locations.find(l => l.isOccupied) == null) {
      ArrayUtils.deleteElement(this.event.areas, area);
      if (this.selectedArea === area) {
        this.selectedArea = null;
      }
    } else {
      this.modalWindow.alert(
        'Kann nicht gelöscht werden!',
        'Dieses Geschoss kann nicht mehr gelöscht werden, da mindestens ein Stand darin gebucht ist!',
        {movable: false}
      );
    }
  }

  public async persistEvent(): Promise<void> {
    if (this.validateEvent()) {
      this.isLoading = true;
      let response = await this.eventDAO.persistEvent(this.event);
      this.isLoading = false;

      if (response != null && response.event != null && response.events != null) {
        this.event = response.event;
        this.toastr.info('Request finished', 'Event speichern!');

        if (this.event.registrationState.isCurrent) {
          this.eventService.currentEvent.next(this.event);
        }

        this.eventService.selectedEvent.next(this.event);
        this.eventService.events.next(response.events);
        this.eventService.updateEvents();
      }
    } else {
      this.toastr.error(
        'Nicht alle nötigen Daten wurden angegeben. Stellen Sie sicher, dass auch Plätze und Geschosse beschriftet sind.',
        'FIT kann nicht gespeichert werden!'
      );
    }
  }

  public noChangesExist(): boolean {
    return EventHelper.compare(this.event, this.eventService.selectedEvent.getValue());
  }

  private validateEvent(): boolean {
    for (let area of this.event.areas) {
      if (area.designation == null || area.designation === '') {
        return false;
      }

      for (let location of area.locations) {
        if (location.number == null || location.number === '') {
          return false;
        }
      }
    }

    return true;
  }
}
