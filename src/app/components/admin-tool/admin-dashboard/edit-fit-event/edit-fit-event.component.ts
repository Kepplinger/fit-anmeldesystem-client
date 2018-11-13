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
import { ModalTemplateCreatorHelper } from '../../../../core/app-helper/modal-template-creator-helper';
import { BaseOnDeactivateAlertComponent } from '../../../../core/base-components/base-on-deactivate-alert.component';

declare let $: any;

@Component({
  selector: 'fit-edit-fit-event',
  templateUrl: './edit-fit-event.component.html',
  styleUrls: ['./edit-fit-event.component.scss']
})
export class EditFitEventComponent extends BaseOnDeactivateAlertComponent implements OnInit {

  public event: Event = new Event();
  public selectedArea: Area = null;

  public isLoading: boolean = false;
  public isModalShown: boolean = false;
  public areAreasChanged: boolean = false;

  public constructor(private changeDetector: ChangeDetectorRef,
                     private toastr: ToastrService,
                     private router: Router,
                     private modalWindow: ModalWindowService,
                     private eventService: EventService,
                     private eventDAO: EventDAO) {
    super();
  }

  public ngOnInit(): void {
    this.event = EventHelper.clone(this.eventService.eventToEdit);
    this.addSub(this.eventService.selectedEvent.subscribe(() => this.event = EventHelper.clone(this.eventService.eventToEdit)));

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

  public setExpiredLockMode(value: boolean): void {
    this.event.isExpiredLockMode = value;
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
    this.areAreasChanged = true;
    let index = this.event.areas.indexOf(this.selectedArea);
    this.event.areas[index] = area;

    this.selectedArea = area;
  }

  public addNewArea(): void {
    this.event.areas.push(new Area());
  }

  public async removeArea(area: Area): Promise<void> {
    if (area.locations.find(l => l.isOccupied) == null) {
      let result = await this.modalWindow.confirm(
        'Geschoß löschen',
        'Wollen Sie dieses Geschoß wirklich löschen?',
        ModalTemplateCreatorHelper.getBasicModalOptions('Ja', 'Abbrechen')
      );
      if (result) {
        ArrayUtils.deleteElement(this.event.areas, area);
        if (this.selectedArea === area) {
          this.selectedArea = null;
        }
        this.areAreasChanged = true;
      }
    } else {
      this.modalWindow.alert(
        'Kann nicht gelöscht werden!',
        'Dieses Geschoß kann nicht mehr gelöscht werden, da mindestens ein Stand darin gebucht ist!',
        {movable: false}
      );
    }
  }

  public async persistEvent(): Promise<void> {
    if (this.validateEvent()) {

      let validDates = this.validateDates();

      if (!validDates) {
        validDates = await this.modalWindow.confirm(
          `<h3>Die Daten sind nicht korrekt</h3>`,
          `Der Registrierungszeitraum ist entweder <b>kein gültiger Zeitruam</b>, oder findet nicht vor dem FIT statt.
          Wollen Sie trotzdem fortfahren?`,
          ModalTemplateCreatorHelper.getBasicModalOptions('Trotzdem fortfahren', 'Abbrechen')
        );
      }

      if (validDates) {
        let response: any = null;

        this.isLoading = true;
        try {
          response = await this.eventDAO.persistEvent(this.event);
        } finally {
          this.isLoading = false;
          this.areAreasChanged = false;
        }

        if (response != null && response.event != null && response.events != null) {
          this.event = response.event;
          this.toastr.success('Request finished', 'Event wurde gespeichert!');

          if (this.event.registrationState.isCurrent) {
            this.eventService.currentEvent.next(EventHelper.clone(this.event));
          }

          this.eventService.selectedEvent.next(EventHelper.clone(this.event));
          this.eventService.events.next(response.events);
          this.eventService.reloadEvents();
        }
      }
    } else {
      this.toastr.error(
        'Nicht alle nötigen Daten wurden angegeben. Stellen Sie sicher, dass auch Plätze und Geschoße beschriftet sind.',
        'FIT kann nicht gespeichert werden!'
      );
    }
  }

  public noChangesExist(): boolean {
    this.unsavedChangesExist = !(EventHelper.compare(this.event, this.eventService.selectedEvent.getValue()) && !this.areAreasChanged && this.event.id != null);
    return !this.unsavedChangesExist;
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

  private validateDates(): boolean {
    return this.event.eventDate.isSameOrAfter(this.event.registrationEnd, 'day') &&
      this.event.registrationEnd.isSameOrAfter(this.event.registrationStart, 'day');
  }
}
