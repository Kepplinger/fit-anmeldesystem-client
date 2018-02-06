import {
  ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import { Area } from '../../../../../core/model/area';
import { Location } from '../../../../../core/model/location';
import { PickedFile } from '../../../../../libs/file-picker/picked-file';
import { FilePickerError } from '../../../../../libs/file-picker/file-picker-error';
import { AreaHelper } from '../../../../../core/model/helper/area-helper';

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
  public pickedFile: PickedFile = new PickedFile();

  public constructor(private changeDetector: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    $('#editAreaModal').on('hidden.bs.modal', () => {
      this.modalHidden.emit();
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputArea'] && this.inputArea != null) {

      let splittedURL = this.inputArea.graphicUrl.split('/');

      this.pickedFile.dataURL = this.inputArea.graphicUrl;
      this.pickedFile.name = splittedURL[splittedURL.length - 1];
      this.area = AreaHelper.clone(this.inputArea);
    }
  }

  public onDragEnd(location: Location, event: any) {
    // location.xCoordinate = $(event).position().left / $(this.areaBounds.nativeElement).width();
    // location.yCoordinate = $(event).position().top  / $(this.areaBounds.nativeElement).height();

    console.log('==============================');
    console.log($(event).position().left / $(this.areaBounds.nativeElement).width() * 100 + '%');
    console.log($(event).position().top / $(this.areaBounds.nativeElement).height() * 100 + '%');
  }

  public filePicked(file: PickedFile | FilePickerError): void {

    if (file instanceof PickedFile) {
      this.pickedFile = file;
      this.area.graphicUrl = file.dataURL;
      this.changeDetector.detectChanges();
    } else if (file === FilePickerError.FileTooBig) {
      console.log('too big');
    } else if (file === FilePickerError.InvalidFileType) {
      console.log('invalid file type');
    } else if (file === FilePickerError.UndefinedInput) {
      console.log('undefined input');
    }
  }

  public selectLocation(location: Location): void {
    this.selectedLocation = location;
  }

  public addNewLocation(): void {
    let location = new Location('----', false, 'B', 50, 50);
    this.selectedLocation = location;
    this.area.locations.push(location);
  }

  public updateArea(): void {
    this.areaChanged.emit(this.area);
  }

}
