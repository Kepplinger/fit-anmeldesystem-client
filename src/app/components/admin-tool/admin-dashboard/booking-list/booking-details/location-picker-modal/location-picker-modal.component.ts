import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Area} from '../../../../../../core/model/area';

import { Location } from '../../../../../../core/model/location';
import {AreaDAO} from '../../../../../../core/dao/area.dao';
import {Event} from '../../../../../../core/model/event';
import {ArrayUtils} from '../../../../../../core/utils/array-utils';

declare let $: any;

@Component({
  selector: 'fit-location-picker-modal',
  templateUrl: './location-picker-modal.component.html',
  styleUrls: ['./location-picker-modal.component.scss']
})
export class LocationPickerModalComponent implements OnInit {

  @Input()
  public event: Event;

  @Input()
  public currentCategory: string;

  @Input()
  public selectedLocation: Location;

  @Output()
  public selectedLocationChange: EventEmitter<Location> = new EventEmitter<Location>();

  public selectedAreaId: number;

  public constructor() {
  }

  public async ngOnInit(): Promise<void> {
    if (this.event != null) {
      // using setTimeout workaround to prevent jQuery failure
      setTimeout(() => {
        let firstArea = ArrayUtils.getFirstElement(this.event.areas);

        if (firstArea != null) {
          this.toggleCollapse(firstArea.id)
        }

        for (let area of this.event.areas) {
          let collapseElement = $('#areaCollapse' + area.id);
          collapseElement.on('shown.bs.collapse',
            () => {
              if (area.id !== this.selectedAreaId) {
                collapseElement.collapse('hide');
              }
            });
        }
      }, 0);
    }
  }

  public toggleCollapse(areaId: number): void {
    this.selectedAreaId = areaId;
    $('#areaCollapse' + areaId).collapse('show');

    for (let area of this.event.areas) {
      if (area.id !== this.selectedAreaId) {
        $('#areaCollapse' + area.id).collapse('hide');
      }
    }
  }

  public getLocationCursor(location: Location): string {
    if (this.isLocationAllowed(location)) {
      return 'pointer';
    } else {
      return 'not-allowed';
    }
  }

  public selectLocation(location: Location): void {
    if (this.isLocationAllowed(location)) {
      this.selectedLocation = location;
    }
  }

  public saveLocation(): void {
    this.selectedLocationChange.emit(this.selectedLocation);
  }

  public getAreaOfLocation(location: Location): Area {
    if (location != null) {
      return this.event.areas.find(a => a.locations.find(l => l.id === location.id) != null)
    } else {
      return null;
    }
  }

  private isLocationAllowed(location: Location): boolean {
    return !(location.isOccupied || (location.category === 'A' && this.currentCategory === 'B'));
  }
}
