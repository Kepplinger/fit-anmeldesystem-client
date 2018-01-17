import { Component, Input, OnInit } from '@angular/core';
import { Area } from '../../../../../core/model/area';
import { Location } from '../../../../../core/model/location';
import { AreaDAO } from '../../../../../core/dao/area.dao';
import { ArrayUtils } from '../../../../../core/utils/array-utils';

declare let $: any;

@Component({
  selector: 'fit-location-picker-modal',
  templateUrl: './location-picker-modal.component.html',
  styleUrls: ['./location-picker-modal.component.scss']
})
export class LocationPickerModalComponent implements OnInit {

  @Input()
  public currentCategory: string;

  public areas: Area[] = [];
  public selectedAreaId: number;
  public selectedLocation: Location;

  public constructor(private areaDAO: AreaDAO) {
  }

  public ngOnInit() {
    this.areas = this.areaDAO.getAreasFromEvent(1);

    // using setTimeout workaround to prevent jQuery failure
    setTimeout(() => {
      let firstArea = ArrayUtils.getFirstElement(this.areas);

      if (firstArea != null) {
        this.toggleCollapse(firstArea.id)
      }

      for (let area of this.areas) {
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

  public toggleCollapse(areaId: number): void {
    this.selectedAreaId = areaId;
    $('#areaCollapse' + areaId).collapse('show');

    for (let area of this.areas) {
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

  private isLocationAllowed(location: Location): boolean {
    return !(location.isOccupied || (location.category === 'A' && this.currentCategory === 'B'));
  }
}
