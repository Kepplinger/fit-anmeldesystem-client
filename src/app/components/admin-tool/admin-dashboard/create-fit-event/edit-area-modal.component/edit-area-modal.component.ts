import {
  ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import { Area } from '../../../../../core/model/area';
import { Location } from '../../../../../core/model/location';
import { PickedFile } from '../../../../../libs/file-picker/picked-file';
import { FilePickerError } from '../../../../../libs/file-picker/file-picker-error';
import { AreaHelper } from '../../../../../core/model/helper/area-helper';
import { ArrayUtils } from '../../../../../core/utils/array-utils';
import { ModalWindowService } from '../../../../../core/app-services/modal-window.service';

declare let $: any;

@Component({
  selector: 'fit-edit-area-modal',
  templateUrl: './edit-area-modal.component.html',
  styleUrls: ['./edit-area-modal.component.scss'],
})
export class EditAreaModalComponent implements OnInit, OnChanges {

  @ViewChild('areaBounds')
  public areaBounds: ElementRef;

  @Output()
  public modalHidden: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public areaChanged: EventEmitter<Area> = new EventEmitter<Area>();

  @Input()
  public inputArea: Area;

  public area: Area;
  public selectedLocation: Location = null;
  public draggableLocations: any[] = [];
  public pickedFile: PickedFile = new PickedFile();

  public constructor(private changeDetector: ChangeDetectorRef,
                     private modalWindow: ModalWindowService) {
  }

  public ngOnInit(): void {
    $('#editAreaModal').on('hidden.bs.modal', () => {
      this.modalHidden.emit();
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputArea'] && this.inputArea != null) {
      this.area = AreaHelper.clone(this.inputArea);
      this.draggableLocations = this.mapLocationsToDraggables();

      if (this.area.graphic != null) {
        this.pickedFile.dataURL = this.area.graphic.dataUrl;
        this.pickedFile.name = this.area.graphic.name;
      }
    }
  }

  public onDragEnd(location: Location, event: any) {
    location.xCoordinate = $(event).position().left / $(this.areaBounds.nativeElement).width() * 100;
    location.yCoordinate = $(event).position().top / $(this.areaBounds.nativeElement).height() * 100;
    console.log(location.xCoordinate + ' | ' + location.yCoordinate);
  }

  public filePicked(file: PickedFile | FilePickerError): void {

    if (file instanceof PickedFile) {
      this.pickedFile = file;
      this.area.graphic.dataUrl = file.dataURL;
      this.changeDetector.detectChanges();
    } else if (file === FilePickerError.FileTooBig) {
      console.error('Image too big');
    } else if (file === FilePickerError.InvalidFileType) {
      console.error('Invalid file type');
    } else if (file === FilePickerError.UndefinedInput) {
      console.error('Undefined file input');
    }
  }

  public selectLocation(location: Location): void {
    this.selectedLocation = location;
  }

  public addNewLocation(): void {
    let location = new Location('', false, 'B', 50, 50);
    this.selectedLocation = location;
    this.area.locations.push(location);
    this.draggableLocations = this.mapLocationsToDraggables();
  }

  public removeLocation(location: Location): void {
    if (!location.isOccupied) {
      ArrayUtils.deleteElement(this.area.locations, location);
      this.draggableLocations = this.mapLocationsToDraggables();
      if (this.selectedLocation === location) {
        this.selectedLocation = null;
      }
    } else {
      this.modalWindow.alert(
        'Kann nicht gelöscht werden!',
        'Dieser Stand ist bereits gebucht und kann nicht mehr gelöscht werden!',
        {movable: false}
      );
    }
  }

  public updateArea(): void {
    this.areaChanged.emit(this.area);
  }

  private mapLocationsToDraggables(): any[] {
    return this.area.locations.map(
      (location: Location) => {
        return {
          location: location,
          top: location.yCoordinate,
          left: location.xCoordinate
        }
      });
  }

  // noinspection JSMethodCanBeStatic
  public selectAll(event: any): void {
    event.target.select();
  }
}
